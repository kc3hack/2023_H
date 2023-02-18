import { React, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Link,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import reportWebVitals from "./reportWebVitals";

reportWebVitals();

function DrawerMenu() {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => {}}
      onKeyDown={() => {}}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Typography variant="h6" color="inherit" component="div">
          <br />
          <Link href={process.env.PUBLIC_URL + "/"} underline="hover">
            トップ
          </Link><hr />
          <br />
          <Link href={process.env.PUBLIC_URL + "/weather"} underline="hover">
            天気
          </Link>
          <br />
          <Link href={process.env.PUBLIC_URL + "/traffic"} underline="hover">
            交通情報
          </Link>
          <br />
          <Link href={process.env.PUBLIC_URL + "/schedule"} underline="hover">
            今日の予定
          </Link>
          <br />
          <Link
            href={process.env.PUBLIC_URL + "/scheduletime"}
            underline="hover"
          >
            今日の時間割
          </Link>
        </Typography>
      </Grid>
    </Box>
  );
}

function Header() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpened(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              component="div"
            ></Typography>
          </Toolbar>
          <Drawer
            anchor={"left"}
            open={drawerOpened}
            onClose={() => setDrawerOpened(false)}
          >
            <DrawerMenu />
          </Drawer>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
