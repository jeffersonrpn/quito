import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Contract } from "@/app/api/contracts/types";
import { currency, shortdate } from "@/app/utils/utils";

type EntryProps = {
  contract: Contract;
  current?: boolean;
};

const Entry = (props: EntryProps) => {
  const { contract, current = false } = props;
  const elevation = contract.status ? 0 : 3;
  const paid = contract.status
    ? { backgroundColor: "#dedbd2" }
    : { backgroundColor: "#ffffff" };
  return (
    <Box m={2}>
      <Card elevation={elevation} sx={paid}>
        <CardActionArea>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid>
                <Avatar sx={{ bgcolor: "#edafb8", color: "#f7e1d7" }}>
                  {contract.number}
                </Avatar>
              </Grid>
              <Grid>
                <Typography variant="body1">
                  {currency(contract.value)}
                </Typography>
                <Typography variant="body1">
                  {shortdate(contract.date.toString())}
                </Typography>
                {current && <Badge>Atual</Badge>}
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Entry;
