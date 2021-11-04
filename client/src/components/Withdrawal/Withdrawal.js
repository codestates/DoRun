import React from 'react';
import './Withdrawal.scss';
const Withdrawal = () => {
  return (
    <>
      <div className="clicked_body">
        <div>아래의 안내사항을 확인하고, 확인 문구를 입력한 후</div>
        <div> Run Away 버튼을 눌러 DoRun 서비스를 탈퇴할 수 있습니다.</div>
        <br />
        <div>
          <div>서비스 탈퇴 안내 사항</div>
          <p>DoRun에 저장된 모든 회원정보가 삭제됩니다.</p>
          <p>삭제된 정보는 다시 복구할 수 없습니다.</p>
          <p>소속된 크루에서 자동으로 탈퇴됩니다.</p>
        </div>
      </div>
      <div className="clicked_footer">
        <div>V 안내사항을 모두 확인하였으며, 이에 동의합니다.</div>
        <div className="withdrawal_btn">Run Away...</div>
      </div>
    </>
  );
};

export default Withdrawal;
