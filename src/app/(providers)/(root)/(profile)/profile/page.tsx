const Profile = () => {
  return (
    <>
      <header>
        <div className="flex flex-row">
          <button>뒤로가기</button>
          <div>Name</div>
          <div>
            <button>로그아웃?</button>
          </div>
        </div>
      </header>
      <main>
        <div>
          <img />
          <div>Name</div>
          <div>부서, 직책</div>
          <div>현재 상태</div>
          <button>메시지</button>
        </div>
        <div>
          <h4>연락처 정보</h4>
          <div>
            <div>이메일 주소</div>
            <div>example@example.com</div>
          </div>
          <div>
            <div>전화</div>
            <div>3838-33438473737</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
