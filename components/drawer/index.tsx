import { FC, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { AppBar, DrawerHeader, Main, useStyles } from "./drawer.styles";
import { DRAWER_WIDTH } from "./utils";
import { useAppSelector } from "../../redux/hooks";
import {
  loadInitialData,
  startCreatechannel,
} from "../../redux/channels/channels.thunks";
import { v4 } from "uuid";
import { Button, CssBaseline, Fab, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../redux/store";
import { setAuthSuccess } from "../../redux/auth/auth.slice";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  channelsSelector,
  currentChannelSelector,
} from "../../redux/channels/channels.selectors";
import { authSelector } from "../../redux/auth/auth.selectors";
import { logOut } from "../../redux/auth/auth.thunks";
import { onSelectChannel } from "../../redux/channels/channels.slice";

const Drawer: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(channelsSelector);
  const { currentUser } = useAppSelector(authSelector);
  const currentChannel = useAppSelector(currentChannelSelector);
  const channelInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const [open, setOpen] = useState(!currentChannel!!);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const router = useRouter();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => {
    dispatch(logOut());
    router.push(ROUTES.LOGIN);
  };

  const handleSelectChannel = (name: string) => {
    dispatch(onSelectChannel(name));
    handleDrawerClose();
  };

  const handleCreateChannel = () => {
    dispatch(startCreatechannel(channelInputRef.current?.value as string));
    handleCloseModal();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthSuccess(user as any));
        dispatch(loadInitialData());
      } else {
        dispatch(logOut());
        router.push(ROUTES.LOGIN);
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentChannel ? currentChannel : "Real Time Chat App"}
          </Typography>

          <Box display="flex" flex="1" />

          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {channels.map(({ name }) => (
            <ListItem
              button
              key={v4()}
              onClick={() => handleSelectChannel(name)}
            >
              <Fab color="primary" aria-label="add" size="large">
                <ListItemText primary={name.charAt(0)} />
              </Fab>
            </ListItem>
          ))}
          <ListItem button onClick={handleOpenModal}>
            <Fab color="primary" aria-label="add" size="large">
              <AddIcon />
            </Fab>
          </ListItem>
        </List>
      </MuiDrawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      <Modal open={openModal} onClose={handleCloseModal} aria-label="modal">
        <Box className={classes.modal}>
          <Typography
            textAlign="center"
            aria-label="modal-title"
            variant="h6"
            component="h2"
          >
            Create channel
          </Typography>
          <TextField
            inputRef={channelInputRef}
            aria-label="modal-input"
            label="Channel's name"
            variant="filled"
          />
          <Button
            aria-label="modal-button"
            variant="contained"
            onClick={handleCreateChannel}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Drawer;
