'use client';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import { createClient } from '@/utils/supabase/supabaseClient';
import { useRef, useState } from 'react';
import Header from '../_components/Header';
import Input from './_components/Input';
import InputGroup from './_components/InputGroup';

const FAKE_USER_ID = '82400d9c-fc50-426c-b8d8-0761eeb81198';

const ProfileEditPage = () => {
  const [image, setImage] = useState<File | null>();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const { workspaceUser, updateWorkspaceUser } = useWorkspaceUser();
  const id = workspaceUser && workspaceUser.id;
  const name = workspaceUser && workspaceUser.name;
  const email = workspaceUser && workspaceUser.email;
  const phone = workspaceUser && workspaceUser.phone;
  const supabase = createClient();

  const handleEdit = async () => {
    if (!(nameRef.current && emailRef.current && phoneRef.current)) return;
    const workspaceUser = {
      id,
      user_id: FAKE_USER_ID,
      workspace_id: 2,
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      profile_image: ''
    };
    updateWorkspaceUser(workspaceUser);
  };

  console.log(image);
  return (
    <div>
      <Header title="프로필 편집" type="edit" />
      <main>
        <div className="m-auto mx-5">
          <img />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          <button>+</button>

          <div>
            <InputGroup title="개인 정보">
              <Input label="성명" defaultValue={name} ref={nameRef} />
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
