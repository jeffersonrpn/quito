import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Person } from "@/app/api/person/types";
import { Contract } from "@/app/api/contracts/types";
import { currency } from "@/app/utils/utils";

type SummaryProps = {
  person: Person;
  contract: Contract;
  allContracts: Contract[];
};

const Summary = (props: SummaryProps) => {
  const { person, contract, allContracts } = props;

  const contracts = allContracts.filter((contract) => !contract.status);
  const paidContracts = allContracts.filter((contract) => contract.status);
  const totalContracts = contracts.length;
  const totalDue = allContracts
    .filter((contract) => !contract.status)
    .reduce((sum, row) => sum + row.value, 0);
  const totalBalance =
    paidContracts.length > 0
      ? paidContracts[paidContracts.length - 1].fee
      : contracts[0].total;
  const showDue = totalDue - totalBalance > 0;

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
              {showDue && (
                <Box mt={2}>
                  <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                    <Grid>
                      <Typography variant="body2" sx={{ color: "#424242" }}>
                        Negociação pra hoje:
                      </Typography>
                    </Grid>
                    <Grid>
                      <Chip label={currency(totalBalance)} color="secondary" />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </CardActionArea>
        </Box>
      </Card>
    </Box>
  );
};

export default Summary;
