'use client';
import api from '@/api/api';
import { userStatusList } from '@/assets/userStatusList';
import BottomLineTextField from '@/components/BottomLineTextField';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import AvatarIcon from '@/icons/Avatar.svg';
import CameraIcon from '@/icons/Camera.svg';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Header from '../_components/Header';
import Input from './_components/Input';
import InputGroup from './_components/InputGroup';

const FAKE_USER_ID = '82400d9c-fc50-426c-b8d8-0761eeb81198';

const ProfileEditPage = () => {
  const [image, setImage] = useState<File | null>();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>();
  const [test, setTest] = useState<string>('');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const workspaceUserId = params.targetWorkspaceUserId as string;
  const { workspaceUser, updateWorkspaceUser } = useWorkspaceUser(workspaceUserId);
  const profileImage = workspaceUser && workspaceUser.profile_image;

  useEffect(() => {
    setImageURL(profileImage);
  }, [profileImage]);

  if (!workspaceUser) return;
  const id = workspaceUser.id;
  const name = workspaceUser.name;
  const email = workspaceUser.email;
  const phone = workspaceUser.phone;
  const state = workspaceUser.state;

  const setEmptyStr = (category: string | null): string => {
    if (!category) return '-';
    else return category;
  };

  const handleTestChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTest(e.target.value);
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageURL(reader.result);
    };
  };

  const handleEdit = async () => {
    if (!(nameRef.current && emailRef.current && phoneRef.current && image)) return;

    const filename = crypto.randomUUID();
    await api.storageProfile.postStorageProfile(image, filename);
    const profile_image = await api.storageProfile.getStorageProfile(filename);

    const workspaceUser = {
      id,
      user_id: FAKE_USER_ID,
      workspace_id: 2,
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      profile_image
    };
    updateWorkspaceUser(workspaceUser);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const workspaceUser = {
      id,
      state: e.target.value
    };
    updateWorkspaceUser(workspaceUser);
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

          <BottomLineTextField
            LabelColor="grey700Black"
            label="이름"
            children=""
            id="1"
            onChange={handleTestChange}
          ></BottomLineTextField>

          <div className="flex flex-col w-full">
            <InputGroup title="개인 정보">
              <Input label="성명" defaultValue={name} ref={nameRef} />
              <select className="text-sm" defaultValue={setEmptyStr(state)} onChange={handleChange}>
                {userStatusList.map((userstatus, index) => (
                  <option key={index} value={userstatus}>
                    {userstatus}
                  </option>
                ))}
              </select>
            </InputGroup>
            <InputGroup title="연락처">
              <Input label="이메일" defaultValue={setEmptyStr(email)} ref={emailRef} />
              <Input label="전화번호" defaultValue={setEmptyStr(phone)} ref={phoneRef} />
            </InputGroup>
          </div>

          <button onClick={handleEdit}>수정하기</button>
        </div>
      </main>
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
