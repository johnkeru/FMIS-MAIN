import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardHeader = ({ title = 'Dashboard', description, sideComponent }) => {
    return (
        <Box
            sx={{
                py: 2,
                px: 3,
                boxShadow: 2,
                color: 'white',
                // bgcolor: 'secondary.main',
                background: 'rgba(55, 94, 56, .9)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
            }}
        >
            <Box >
                <Typography variant="h4" component="h2" fontWeight="bold" >
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body2">
                        {description}
                    </Typography>
                )}
            </Box>

            {sideComponent}
        </Box>
    );
};

export default DashboardHeader;
