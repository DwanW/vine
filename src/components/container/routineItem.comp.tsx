import { Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { openConfirmDialog } from "../../redux/feedback/feedback.slice";
import { deleteRoutine } from "../../redux/user/user.slice";
import { useAppDispatch } from "../../util/hooks";
import {
  calculateCompletion,
  calculateStreak,
  scheduleToString,
} from "../../util/validation";
import {
  ActionContainer,
  Bar,
  ItemHeader,
  ItemSubInfo,
  LightBar,
  MenuButton,
  MoreButton,
  RoutineItemContainer,
  StatsContainer,
  StatsInfo,
} from "./routineItem.styles";

interface Props {
  routine: any;
}

const RoutineItem = ({ routine }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    dispatch(
      openConfirmDialog({
        message: `Permanently Delete ${routine.name}.`,
        confirmFunc: () => {
          dispatch(deleteRoutine(routine.id));
        },
      })
    );
  };

  return (
    <RoutineItemContainer>
      <div>
        <LightBar />
        <ItemHeader>{routine.name}</ItemHeader>
        <ItemSubInfo>{scheduleToString(routine.schedule)}</ItemSubInfo>
        <StatsContainer>
          <Bar />
          <div>
            <StatsInfo>
              Highest Streak:{" "}
              {
                calculateStreak(
                  routine.records,
                  routine.schedule,
                  routine.startdate
                ).maxStreak
              }
            </StatsInfo>{" "}
            <StatsInfo>
              Completion:{" "}
              {(
                calculateCompletion(
                  routine.records,
                  routine.schedule,
                  routine.startdate
                ) * 100
              ).toFixed(2)}{" "}
              %
            </StatsInfo>
          </div>
        </StatsContainer>
      </div>
      <ActionContainer>
        <Tooltip title="Light graph" arrow>
          <NavLink to={`/light/${routine.id}`}>
            <img src="assets/icon/light.svg" alt="lightgraph button" />
          </NavLink>
        </Tooltip>
        <Tooltip title="View Stats" arrow>
          <NavLink to={`/stats/${routine.id}`}>
            <img src="assets/icon/stats.svg" alt="stats button" />
          </NavLink>
        </Tooltip>
        <MoreButton onClick={handleClick}>
          <img src="assets/icon/vert.svg" alt="more button" />
        </MoreButton>
        <Menu
          id="menu"
          aria-labelledby="menu-list"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleClose}>
            <NavLink to={`/update/${routine.id}`}>
              <MenuButton>
                <img src="assets/icon/edit.svg" alt="edit button" />
                <span>Edit</span>
              </MenuButton>
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <MenuButton>
              <img src="assets/icon/delete.svg" alt="delete button" />
              <span>Delete</span>
            </MenuButton>
          </MenuItem>
        </Menu>
      </ActionContainer>
    </RoutineItemContainer>
  );
};

export default RoutineItem;
