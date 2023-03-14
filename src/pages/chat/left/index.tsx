import LogoutButton from '@/components/themeMode/buttons/logout';
import { useAppDispatch } from '@/store';
import { fetchRoomList } from '@/store/slices/chat';
import { getItemLocalStorage } from '@/utils/helpers';
import { useEffect } from 'react';
import RoomList from './roomList';
import { StyledLogout, StyledWrap } from './styles';

const LeftChat = () => {
  const user = getItemLocalStorage("user")
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRoomList(user._id))
  }, [dispatch, user])

  return (
    <StyledWrap>
      <RoomList />
      <StyledLogout>
        <LogoutButton />
      </StyledLogout>
    </StyledWrap>
  );
};

export default LeftChat;
