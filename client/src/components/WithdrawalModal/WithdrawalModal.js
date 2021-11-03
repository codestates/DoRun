import React from 'react';
import { Link } from 'react-router-dom';
import './WithdrawalModal.scss';

// const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
// const WithdrawalModalHandler = () => setIsWithdrawalModalOpen(!isWithdrawalModalOpen)
// {isWithdrawalModalOpen && <WithdrawalModal withdrawalModalHandler={withdrawalModalHandler} />}

const WithdrawalModal = ({ withdrawalModalHandler, isActive }) => {
  console.log(isActive);
  return (
    <div className="WithdrawalModal">
      <div className="WithdrawaModal_wrapper">
        <div className="WithdrawalModal_header">
          <div className="header_exit" onClick={withdrawalModalHandler}>
            x
          </div>
        </div>

        <br />

        <div className="WithdrawalModal_body"></div>

        <br />

        <div className="WithdrawalModal_footer"></div>

        <br />
      </div>
    </div>
  );
};

export default WithdrawalModal;
