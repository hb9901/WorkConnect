'use client';
import api from '@/api/api';
import { userStatusList } from '@/assets/userStatusList';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Header from '../_components/Header';
import Input from './_components/Input';
import InputGroup from './_components/InputGroup';

const FAKE_USER_ID = '82400d9c-fc50-426c-b8d8-0761eeb81198';

const ProfileEditPage = () => {
  const [image, setImage] = useState<File | null>();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const { workspaceUser, updateWorkspaceUser } = useWorkspaceUser();
  const id = workspaceUser && workspaceUser.id;
  const profileImage = workspaceUser && workspaceUser.profile_image;
  const name = workspaceUser && workspaceUser.name;
  const email = workspaceUser && workspaceUser.email;
  const phone = workspaceUser && workspaceUser.phone;
  const state = workspaceUser && workspaceUser.state;

  useEffect(() => {
    setImageURL(profileImage);
  }, [profileImage]);

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
        <div className="flex flex-col w-full items-center px-5">
          <div className="w-32 h-32 aspect-square relative">
            {imageURL && (
              <Image
                src={imageURL.toString()}
                alt="프로필 이미지"
                className="object-contain"
                fill
                priority
                sizes="8rem"
              />
            )}
          </div>
          <button>
            <label htmlFor="profile">+</label>
          </button>
          <input id="profile" type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />

          <div className="flex flex-col w-full">
            <InputGroup title="개인 정보">
              <Input label="성명" defaultValue={name} ref={nameRef} />
              <select className="text-sm" defaultValue={state} onChange={handleChange}>
                {userStatusList.map((userstatus, index) => (
                  <option key={index} value={userstatus}>
                    {userstatus}
                  </option>
                ))}
              </select>
            </InputGroup>
            <InputGroup title="연락처">
              <Input label="이메일" defaultValue={email} ref={emailRef} />
              <Input label="전화번호" defaultValue={phone} ref={phoneRef} />
            </InputGroup>
          </div>

          <button onClick={handleEdit}>수정하기</button>
        </div>
      </main>
    </div>
  );
};

export default ProfileEditPage;
