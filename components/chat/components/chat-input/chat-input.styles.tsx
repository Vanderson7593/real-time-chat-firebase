import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { DRAWER_WIDTH } from "../../../drawer/utils";

export const Container = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 5px;
  width: 90%;
`;
