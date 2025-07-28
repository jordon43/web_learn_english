import { UserData } from "@/entities/user/model/types";
import { Box } from "@mui/material";

type UserInfoProps = {
  userData: UserData;
};

export const UserInfo = (props: UserInfoProps) => {
  const { userData } = props;

  return (
    <Box>
      <Box>userName: {userData.username}</Box>
      <Box>userId: {userData.id}</Box>
    </Box>
  );
};
