import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Header from '../../../components/Header/Header';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Pages from '../../../components/Pages/Pages';
import {
  deleteMembershipOrder,
  resetDeleteMembershipOrder
} from '../../../slices/membershipOrderSlices/membershipOrderDeleteSlice';
import { getMembershipOrders } from '../../../slices/membershipOrderSlices/membershipOrdersGetSlice';
import styles from './MembershipOrdersListScreen.module.css';

export default function MembershipOrdersListScreen(props) {
  const { pageNumber = '1' } = useParams();

  const membershipOrdersGetSlice = useSelector(
    (state) => state.membershipOrdersGetSlice
  );
  const { status, membershipOrders, pages, error } = membershipOrdersGetSlice;

  const membershipOrderDeleteSlice = useSelector(
    (state) => state.membershipOrderDeleteSlice
  );
  const {
    status: statusDelete,
    membershipOrder: membershipOrderDelete,
    error: errorDelete
  } = membershipOrderDeleteSlice;

  const dispatch = useDispatch();
  const deleteHandler = (membershipOrder) => {
    if (
      window.confirm(`Are you sure you want to delete ${membershipOrder.name}`)
    ) {
      dispatch(deleteMembershipOrder(membershipOrder._id));
    }
  };

  // Cleanup membershipOrders page on unmount
  useEffect(() => {
    return () => {
      if (membershipOrderDelete) {
        dispatch(resetDeleteMembershipOrder());
      }
    };
  }, [dispatch, membershipOrderDelete]);

  useEffect(() => {
    dispatch(getMembershipOrders({ pageNumber }));
  }, [dispatch, membershipOrderDelete, pageNumber]);

  return (
    <div>
      <Header admin membershipOrders_page></Header>
      <div className={styles.hero_section}>
        <h1 className={styles.heading}>Membership Orders Page</h1>
      </div>
      <div className="table_wrapper">
        {statusDelete === 'loading' && <LoadingBox></LoadingBox>}
        {membershipOrderDelete && (
          <MessageBox variant="success">
            Membership order Deleted Succesfully
          </MessageBox>
        )}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {status === 'loading' ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {membershipOrders.map((membershipOrder) => (
                <tr key={membershipOrder._id}>
                  <td>{membershipOrder._id}</td>
                  <td>{membershipOrder.paymentResult.transaction_id}</td>
                  <td>{membershipOrder.user.email}</td>
                  <td>{membershipOrder.createdAt.substring(0, 10)}</td>
                  <td>{`${membershipOrder.totalPrice} KES`}</td>
                  <td>
                    {!membershipOrder.isPaid ? (
                      <button
                        className="small"
                        type="button"
                        onClick={() =>
                          props.history.push(
                            `/orders-status-admin/${encodeURIComponent(
                              membershipOrder._id
                            )}/${encodeURIComponent(
                              membershipOrder.paymentResult.transaction_id
                            )}`
                          )
                        }
                      >
                        Check status
                      </button>
                    ) : (
                      'True'
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteHandler(membershipOrder)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pages
        to={'membershipOrders-admin'}
        currentPage={parseInt(pageNumber)}
        pages={parseInt(pages)}
      ></Pages>
    </div>
  );
}
