import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { get_all_service_list_dropdown } from "../api/package";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({ type, setMultipleId }) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [allService, setAllService] = useState([]);


    useEffect(() => {
        fetchallServiceFunc(type);
    }, [type]);

    const fetchallServiceFunc = async (id) => {
        let temp = {
            category: id
        };
        try {
            let res = await get_all_service_list_dropdown(temp);
            if (res?.data?.status) {
                setAllService(res?.data?.data?.services);
            } else {
                console.log("false Status!");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (event) => {
        const { target: { value }, } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        setMultipleId(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    className="form-control"
                    value={personName}
                    onChange={handleChange}
                    // input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {allService?.map((name) => (
                        <MenuItem
                            key={name}
                            value={name.name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name?.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
