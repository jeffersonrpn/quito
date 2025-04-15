import { Avatar, Box, Typography } from "@mui/material";
import { Person } from "@/app/api/person/types";

type HeaderProps = {
  person: Person;
};
const Header = (props: HeaderProps) => {
  const { person } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      sx={{
        backgroundColor: "#4a5759",
        color: "#dedbd2",
        paddingBottom: "2rem",
      }}
    >
      <Box p={2} display="flex" alignItems="center">
        <Box pr={2}>
          <Avatar alt={person.person} src={person.avatar} />
        </Box>
        <Box>
          <Typography variant="body1">{person.person}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
