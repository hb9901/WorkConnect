'use client';
import api from '@/api/api';
import Button from '@/components/Button';
import TextFieldButton from '@/components/TextFieldButton';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import AvatarIcon from '@/icons/Avatar.svg';
import CameraIcon from '@/icons/Camera.svg';
import useUserStore from '@/store/userStore';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import Header from '../_components/Header';
import IsOpenInput from './_components/Input/IsOpenInput';
import InputBottomSheet from './_components/InputBottomSheets/InputBottomSheet';
import useInput from './_hooks/useInput';

const ProfileEditPage = () => {
  const { editInputs, name, state, email, phone, setName, setState, setEmail, setPhone } = useInput();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userId = useUserStore((state) => state.userId);
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const [image, setImage] = useState<File | null>();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>();
  const params = useParams();
  const workspaceUserId = params.targetWorkspaceUserId as string;
  const { workspaceUser, updateWorkspaceUser } = useWorkspaceUser(workspaceUserId);
  const profileImage = workspaceUser && workspaceUser.profile_image;
  const workspaceName = workspaceUser && workspaceUser.name;
  const workspaceEmail = workspaceUser && workspaceUser.email;
  const workspacePhone = workspaceUser && workspaceUser.phone;
  const workspaceState = workspaceUser && workspaceUser.state;
  const workspaceIsOpen = workspaceUser && workspaceUser.is_open;

  const setEmptyStr = (category: string | null | undefined): string => {
    if (!category) return '';
    else return category;
  };

  useEffect(() => {
    setImageURL(profileImage);
    setName(setEmptyStr(workspaceName));
    setState(setEmptyStr(workspaceState));
    setEmail(setEmptyStr(workspaceEmail));
    setPhone(setEmptyStr(workspacePhone));
    setIsOpen(workspaceIsOpen ? workspaceIsOpen : false);
  }, [profileImage, workspaceName, workspaceEmail, workspacePhone, workspaceState, workspaceIsOpen]);

  const handleIsOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageURL(reader.result);
    };
  };

  const handleEdit = async () => {
    if (!(userId && workspaceId)) return;

    if (image) {
      const filename = crypto.randomUUID();
      await api.storageProfile.postStorageProfile(image, filename);
      const profile_image = await api.storageProfile.getStorageProfile(filename);
      const workspaceUser = {
        id: workspaceUserId,
        user_id: userId,
        workspace_id: workspaceId,
        name,
        email,
        phone,
        state,
        is_open: isOpen,
        profile_image
      };
      await updateWorkspaceUser(workspaceUser);
      router.push(`/${workspaceId}/profile/${workspaceUserId}`);
      return;
    } else {
      const workspaceUser = {
        id: workspaceUserId,
        user_id: userId,
        workspace_id: workspaceId,
        name,
        email,
        phone,
        is_open: isOpen,
        state
      };
      await updateWorkspaceUser(workspaceUser);
      router.push(`/${workspaceId}/profile/${workspaceUserId}`);
      return;
    }
  };

  return (
    <div>
      <Header title="프로필 편집" type="edit" />
      <main>
        <div className="flex flex-col w-full items-center px-5 relative">
          <div className={AvatarVariants({ isImageExist: imageURL ? true : false })}>
            {imageURL ? (
              <Image
                src={imageURL.toString()}
                alt="프로필이미지"
                className="object-cover rounded-full"
                fill
                priority
                sizes="140px"
              />
            ) : (
              <AvatarIcon className="w-[84px] h-[84px] bg-[#BDBDBD]" />
            )}
            <button className="absolute bottom-0 right-0">
              <label htmlFor="profile">
                <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#FAFAFA]">
                  <CameraIcon className="w-[24px] h-[24px]" />
                </div>
              </label>
            </button>
          </div>
          <input id="profile" type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
          <div className="flex flex-col w-full gap-[12px] mb-[30px]">
            {editInputs.map((editInput) => (
              <TextFieldButton
                key={editInput.label}
                LabelColor="grey400"
                label={editInput.label}
                value={editInput.value}
                onClick={() => editInput.onClick(editInput.value)}
              />
            ))}
            <IsOpenInput isOpen={isOpen} handleIsOpenClick={handleIsOpenClick} />
          </div>
          <Button theme="primary" isFullWidth onClick={handleEdit}>
            수정하기
          </Button>
        </div>
      </main>

      {editInputs.map((editInput) => (
        <InputBottomSheet editInput={editInput} key={editInput.label} />
      ))}
    </div>
  );
};

export default ProfileEditPage;

const AvatarVariants = cva(
  'mt-[54px] flex items-center justify-center w-[140px] h-[140px] aspect-auto relative rounded-full',
  {
    variants: {
      isImageExist: {
        true: '',
        false: 'bg-[#BDBDBD]'
      }
    },
    defaultVariants: {
      isImageExist: false
    }
  }
);
