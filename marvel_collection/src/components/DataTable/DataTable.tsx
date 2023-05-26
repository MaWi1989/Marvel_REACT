import React, {useState} from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api'; 
import { useGetData } from '../../custom-hooks'; 
import { CharacterForm } from '../../components/CharacterForm';
import { 
    Button,
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from "@mui/material";
import { getAuth } from 'firebase/auth'


const columns: GridColDef[] = [
  { field: 'id', 
  headerName: 'ID', 
  width: 150 
},
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    type: 'string',
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'string',
    width: 300,
    editable: true,
  },
  {
    field: 'series',
    headerName: 'Series',
    type: 'string',
    width: 300,
    editable: true,
  },
  {
    field: 'powers',
    headerName: 'Super Powers',
    type: 'string',
    width: 300,
    editable: true,
  },
  {
    field: 'comics_appeared_in',
    headerName: 'Comics appeared in',
    type: 'number',
    width: 80,
   
  },
  {
    field: 'first_appeared_in',
    headerName: 'first appeared in',
    type: 'string',
    width: 200,
    editable: true,
  },
  {
    field: 'year_introduced',
    headerName: 'Year Introduced',
    type: 'number',
    width: 120,
  },

// to combine values into 1 column:
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
 
];



interface gridData {
  data: {
      id?: string;
  }
}


export const DataTable =  () => {
  const auth = getAuth()
  
    let { characterData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridRowSelectionModel>([])
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      serverCalls.delete(`${gridData[0]}`)
      getData()
    }
  
   
    console.log(gridData) 
    
    const MyAuth = localStorage.getItem('myAuth');

    console.log(MyAuth);


    if (MyAuth === 'true'){
    return (
          <div style={{ height: 400, width: '100%' }}>
            <h2>Characters In Inventory</h2>
            <DataGrid 
              rows={characterData} 
              columns={columns} 
              pageSize={9}
              rowsPerPageOptions={[9]} 
              checkboxSelection 
              onRowSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
              {...characterData}  
          />
  
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
  
            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
            <DialogContent>
              <DialogContentText>Character id: {gridData[0]}</DialogContentText>
                <CharacterForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>
          </div>
        );

   } else { 
    return( 
    <div>
        <h3>Please Sign In to View Your Marvel Character Collection</h3>
    </div>
)};
}
