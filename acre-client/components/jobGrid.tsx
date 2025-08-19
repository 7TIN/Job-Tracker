'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, themeQuartz } from 'ag-grid-community';
import { Job } from '@/types/job';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { createJob } from '@/app/dashboard/actions';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Check, PlusCircle } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);


const myTheme = themeQuartz.withParams({
  accentColor: '#087AD1',
  backgroundColor: '#FFFFFF',
  borderColor: '#D7E2E6',
  borderRadius: 2,
  browserColorScheme: 'light',
  cellHorizontalPaddingScale: 1,
  chromeBackgroundColor: {
    ref: 'backgroundColor',
  },
  columnBorder: true,
  fontSize: 13,
  foregroundColor: '#555B62',
  headerBackgroundColor: '#FFFFFF',
  headerFontSize: 13,
  headerFontWeight: 400,
  headerTextColor: '#84868B',
  rowBorder: true,
  rowVerticalPaddingScale: 0.8,
  sidePanelBorder: true,
  spacing: 6,
  wrapperBorder:true,
  wrapperBorderRadius: 10,
});


// const SaveButtonRenderer = (props: ICellRendererParams<Job>) => {
//   const { data, api, node } = props;

//   if (!data?.id?.toString().startsWith('temp_')) {
//     return null;
//   }

//   const onSave = async () => {
//     api.stopEditing();

//     const rowData = node.data;
//     const result = await createJob(rowData);

//     if (result.error) {
//       toast.error('Failed to save job', { description: result.error });
//     } else if (result.success && result.data) {
//       toast.success('Job saved successfully!');

//       // replace temp row with new DB row
//       api.applyTransaction({
//         update: [result.data],
//       });

//       api.refreshClientSideRowModel('sort');
//     }
//   };
// 
//   return (
//     <div className="flex items-center justify-center h-full">
//       <Button variant="ghost" size="icon" onClick={onSave} title="Save Job">
//         <Check className="h-5 w-5 text-green-600" />
//       </Button>
//     </div>
//   );
// };

type Props = {
  data: Job[];
};

export default function JobGrid({ data }: Props) {
  const gridRef = useRef<AgGridReact<Job>>(null);

  const [rowData, setRowData] = useState<Job[]>(data);
  const [tempRowId, setTempRowId] = useState<string | null>(null);
  
  useEffect(() => {
    setRowData(data);
  }, [data]);

  const [columnDefs] = useState<ColDef<Job>[]>([
    {
    headerName: '#',
    valueGetter: 'node.rowIndex + 1',
    width: 60,
    suppressMovable: true,
    pinned: 'left',
  },
    { headerName: 'Company', field: 'company', editable: true },
    { headerName: 'Position', field: 'position', editable: true },
    { headerName: 'Applied Date', field: 'appliedDate', editable: true,},
    { headerName: 'Platform', field: 'platform', editable: true },
    {
      headerName: 'Status',
      field: 'status',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      
      cellEditorParams: {
        values: ['Applied', 'Interviewing', 'Assessment', 'Offer', 'Rejected', 'Wishlist'],
      },
    },
    { headerName: 'Location', field: 'location', editable: true},
    { headerName: 'Salary', field: 'salary', editable: true},
    { headerName: 'Notes', field: 'notes', editable: true, flex: 2 },
    { headerName: 'Link', field: 'applicationLink', editable: true },
  ]);

  const defaultColDef = useMemo<ColDef<Job>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
    }),
    []
  );

    const handleAddRow = () => {
    if (tempRowId) return;

    const newRow: Job = {
      id: `temp_${crypto.randomUUID()}`,
      company: '',
      position: '',
      appliedDate: new Date().toISOString().split('T')[0], 
      status: 'Applied',
      platform: '',
      applicationLink: '',
      location: 'undisclosed',
      salary: '0',
      notes: ' ',
      userId: '', 
    };

    setTempRowId(newRow.id);

    gridRef.current?.api.applyTransaction({
      add: [newRow],
      addIndex: 0,
    });
  };


  const handleSaveRow = async () => {
    if (!tempRowId) return;

    const gridApi = gridRef.current?.api;
    if (!gridApi) return;

    gridApi.stopEditing();

    const rowNode = gridApi.getRowNode(tempRowId);
    if (!rowNode || !rowNode.data) {
        toast.error("Could not find the new row to save.");
        return;
    }

    const rowData = rowNode.data;
    const result = await createJob(rowData);

    if (result.error) {
      toast.error('Failed to save job', { description: result.error });
    } else if (result.success && result.data) {
      toast.success('Job saved successfully!');

      gridApi.applyTransaction({
        update: [result.data],
      });

      gridApi.refreshClientSideRowModel('sort');
      
      setTempRowId(null);
    }
  };

  return (
   <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
     <Button onClick={handleAddRow} className="w-fit">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Job
      </Button>

      {tempRowId && (
          <Button onClick={handleSaveRow} className="w-fit" variant="outline">
            <Check className="mr-2 h-4 w-4 text-green-600" /> Save
          </Button>
        )}
    </div>
    <div className="shadow-xl shadow-neutral-200 rounded-b-xl w-full h-[500px]">
      <AgGridReact<Job>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        theme={myTheme}
        stopEditingWhenCellsLoseFocus={true}
        getRowId={(params) => params.data.id}
        // editType="fullRow"
      />
    </div>
    </div>
  );
}
