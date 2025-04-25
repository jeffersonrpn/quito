import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Person } from "@/app/api/person/types";
import { Contract } from "@/app/api/contracts/types";
import { currency } from "@/app/utils/utils";

type SummaryProps = {
  person: Person;
  contract: Contract;
  totalDue: number;
  totalContracts: number;
};

const Summary = (props: SummaryProps) => {
  const { person, contract, totalDue, totalContracts } = props;

  return (
    <Box sx={{ margin: "-2rem 1rem 2rem 1rem" }}>
      <Card elevation={4}>
        <Box p={2}>
          <CardActionArea>
            <CardContent>
              <Typography variant="body1" textAlign="center">
                {person.description}
              </Typography>
              <Typography variant="body1">Valor total</Typography>
              <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid>
                  <Typography variant="h5" sx={{ color: "#00786a" }}>
                    {currency(contract.total)}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ color: "#00786a" }}
                  >
                    {contract.number}
                  </Typography>{" "}
                  parcelas
                </Grid>
              </Grid>
              <Typography variant="body1">Restante</Typography>
              <Grid container alignItems="center" justifyContent="space-evenly">
                <Grid>
                  <Typography variant="h5" sx={{ color: "#424242" }}>
                    {currency(totalDue)}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ color: "#424242" }}
                  >
                    {totalContracts}
                  </Typography>{" "}
                  parcelas
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Box>
      </Card>
    </Box>
  );
};

export default Summary;
