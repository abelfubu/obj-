import React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, IconButton } from '@material-ui/core/';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    props.click();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label='add to favorites'>
        <DeleteIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='Confirmar borrar objetivo'>
        <DialogTitle id='responsive-dialog-title'>
          {'¿Estas seguro de borrar el objetivo?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Puedes borrar y añadir todos los objetivos que quieras, pero ten en
            cuenta que una vez borrado, ya no podrás recuperarlo.
          </DialogContentText>
          <DialogContentText>
            Los objetivos desaparecen automaticamente una vez pasada la fecha
            final de objetivo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color='secondary' autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
