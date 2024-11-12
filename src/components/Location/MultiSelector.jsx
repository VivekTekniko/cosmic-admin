import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Checkbox } from "@mui/material";

const ITEM_HEIGHT = 60;
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

export default function MultipleSelect({ subjects, setsubjectId }) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        // Create a new array with all selected values (names)
        const selectedNames = typeof value === 'string' ? value.split(',') : value;

        // Update personName state with selected names
        setPersonName(selectedNames);

        // Get the corresponding subject IDs for the selected names
        const selectedIds = selectedNames.map((location) => {
            const subject = subjects.find((subject) => subject.location === location);
            return subject ? subject._id : null; // Return null if subject is not found (shouldn't happen)
        }).filter((id) => id !== null); // Filter out any null values

        console.log(selectedIds, "Selected subject IDs");

        // Update the subject IDs state
        setsubjectId(selectedIds);
    };

    return (
        <div>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                className="form-control"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {subjects?.map((subject) => (
                    <MenuItem
                        key={subject._id}
                        value={subject.location}
                        style={getStyles(subject.location, personName, theme)}
                    >
                        <Checkbox checked={personName.indexOf(subject.location) > -1} />
                        {subject.location}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}

