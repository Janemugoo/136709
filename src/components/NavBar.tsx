import {
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import RoofingIcon from "@mui/icons-material/Roofing";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "@/constants/firebase";
import { useRouter } from "next/navigation";
export function NavBar() {
  return (
    <>
      <Box className="h-full rounded-sm text-xs md:text-md border-transparent transition-shadow shadow-lg flex flex-col justify-between z-50 overflow-hidden">
        <Box>
          <Box className="text-center h-14 md:h-16 w-full xl:h-20 flex flex-col justify-center place-items-center sticky">
            <RoofingIcon className="self-center mx-3 h-6 w-6 sm:h-9 inline-block" />
            <Typography
              variant="h6"
              className="hidden md:flex text-center mx-2.5 font-bold whitespace-nowrap"
            >
              DUTCH
            </Typography>
          </Box>
          <Divider />
          <Box className="overflow-y-auto">
            <NavGroup />
          </Box>
        </Box>
        <Box className="flex flex-col justify-center">
          <UserData />
        </Box>
      </Box>
    </>
  );
}
function UserData() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };

  if (!user) return null;
  return (
    <>
      <Box className="m-2 flex justify-center place-content-center md:place-items-stretch">
        <Avatar className="h-8 w-8 lg:w-10 lg:h-10 m-0">U</Avatar>
        <Box className="hidden lg:block ml-2 text-md truncate lg:text-xs">
          <Typography variant="caption">{user.email}</Typography>
        </Box>
      </Box>
      <Button
        onClick={logout}
        size="small"
        startIcon={<ExitToAppRoundedIcon />}
        className="bg-primary border-2 md:m-2 lg:m-4 text-white opacity-80 hover:bg-gray-300 w-auto  [&>*:first-child:hover]:text-primary"
      >
        <Typography
          variant="subtitle1"
          className="hidden md:block text-white hover:text-primary normal-case"
        >
          Logout
        </Typography>
      </Button>
    </>
  );
}
function NavGroup() {
  const router =useRouter()
  return (
    <Box className="border-b-2 border-solid mx-1 xl:mx-5 flex flex-col justify-center place-items-center md:place-items-stretch">
      <List className="m-1 lg:m-2 p-0">
        { Navlinks.map(
          (route) => (
            <ListItem key={route.name} onClick={()=> router.push (route.link)}>
              <ListItemButton className="p-1 flex justify-center place-items-center">
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
}
 const Navlinks = [{name:'Dashboard',link:'/'}, {name:'Tasks',link:'/tasks'}, {name:'Reports',link:'/report'}, {name:'Account Settings',link:'/account-settings'}, {name:'Help',link:'/'} ]