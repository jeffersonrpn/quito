import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
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
                {current && <Typography variant="body1">Próxima</Typography>}
                <Box mb={2}>
                  <Typography variant="h5" sx={{ color: "#00786a" }}>
                    {currency(contract.value)}
                  </Typography>
                  <Typography variant="body1">
                    {shortdate(contract.duedate.toString())}
                  </Typography>
                </Box>
                {contract.date && (
                  <Chip
                    label={`Pago em ${shortdate(contract.date.toString())}`}
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Entry;
