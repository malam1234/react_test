import Card from '@mui/material/Card'; // Ensure you have @mui/material installed
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Drawer, Paper, styled } from '@mui/material';
import DrawerList from './DrawerList';

import React, { useState, FC } from 'react';

const Homepage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const exportToCSV = (): void => {
    const data: { name: string; description: string }[] = [
      { name: 'Lizard', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.' }
    ];
    const csvRows: string[] = [
      'Name,Description',
      ...data.map(row => `"${row.name}","${row.description.replace(/"/g, '""')}"`)
    ];
    const csvContent: string = csvRows.join('\n');
    const blob: Blob = new Blob([csvContent], { type: 'text/csv' });
    const url: string = window.URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>

      <div className='container'>
        <div className="row">
          <div className="col-md-4">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="270"
                image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                alt="nature landscape"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={toggleDrawer(true)} startIcon={<span className="material-icons">menu</span>}>
                  Drawer
                </Button>
                <Button size='small' onClick={exportToCSV} startIcon={<span className="material-icons">file_download</span>}>
                  Export
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList()}
                </Drawer>
              </CardActions>
            </Card>
          </div>
          <div className="col-md-8">

          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;