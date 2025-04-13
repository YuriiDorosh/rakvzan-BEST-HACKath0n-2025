import React, { FC } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography, Button } from '@mui/material';

interface MapFilterPanelProps {
  categories: string[];
  selectedCategories: string[];
  onChangeCategories: (newSelected: string[]) => void;
  accessibilityChecked: boolean;
  onChangeAccessibility: (checked: boolean) => void;
  onApply: () => void;
  onCancel: () => void;
  isOpen: boolean;
  handleClose: () => void
}

const MapFilterPanel: FC<MapFilterPanelProps> = ({
  categories,
  selectedCategories,
  onChangeCategories,
  accessibilityChecked,
  onChangeAccessibility,
  onApply,
  onCancel,
  isOpen,
  handleClose,
}) => {
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      const newSelected = selectedCategories.filter(c => c !== category);
      onChangeCategories(newSelected);
    } else {
      onChangeCategories([...selectedCategories, category]);
    }
  };

  const handleAccessibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAccessibility(e.target.checked);
  };

  return (
    <Box
      sx={{
        width: 260,
        overflowX: 'hidden',
        background: '#fff',
        borderRadius: 2,
        padding: 2,
        boxShadow: 3,
        display: isOpen?'flex': 'none',
        flexDirection: 'column',
        gap: 1,
        position: 'fixed',
        top: '20svh',
        left: '20px',
        zIndex: '500'
      }}
    >
      
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Категорії
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>


      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        <Button variant="contained" onClick={onApply}>ЗАСТОСУВАТИ</Button>
        <Button variant="outlined" onClick={onCancel}>СКАСУВАТИ</Button>
      </Box>
    </Box>
  );
};

export default MapFilterPanel;
