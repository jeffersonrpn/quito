"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { Contract } from "@/app/api/contracts/types";
import Entry from "./Entry";

type FullContractProps = {
  title: string;
  contracts: Contract[];
};

const FullContract = (props: FullContractProps) => {
  const { title, contracts } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button
          variant="text"
          endIcon={<KeyboardArrowDownRoundedIcon />}
          onClick={() => setOpen((value) => !value)}
        >
          {title}
        </Button>
      </Box>
      <Accordion
        expanded={open}
        slotProps={{ transition: { unmountOnExit: true } }}
        sx={{ backgroundColor: "var(--background)", border: "none", margin: 0 }}
      >
        <AccordionSummary
          id="contract"
          sx={{ display: "none" }}
        ></AccordionSummary>
        <AccordionDetails>
          {contracts.map((contract) => (
            <Entry key={contract.number} contract={contract} />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FullContract;
