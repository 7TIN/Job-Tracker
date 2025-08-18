'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, themeQuartz } from 'ag-grid-community';
import { Job } from '@/types/job';
import { AllCommunityModule,ModuleRegistry } from 'ag-grid-community';
// import { Button } from './ui/button';
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

type Props = {
  data: Job[];
};

export default function JobGrid({ data }: Props) {
  const gridRef = useRef<AgGridReact<Job>>(null);

  const [rowData, setRowData] = useState<Job[]>(data);
  
  useEffect(() => {
    setRowData(data);
  }, [data]);

  const [columnDefs] = useState<ColDef<Job>[]>([
    {
    
    valueGetter: 'node.rowIndex + 1',
    width: 50,
    suppressMovable: true,
    pinned: 'left',
  },
    { headerName: 'Company', field: 'company', editable: true },
    { headerName: 'Position', field: 'position', editable: true },
    { headerName: 'Applied Date', field: 'appliedDate', editable: true },
    { headerName: 'Platform', field: 'platform', editable: true },
    {
      headerName: 'Status',
      field: 'status',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Applied', 'Interviewing', 'Rejected', 'Offer'],
      },
    },
    { headerName: 'Location', field: 'location', editable: true},
    { headerName: 'Salary', field: 'salary', editable: true},
    { headerName: 'Notes', field: 'notes', editable: true},
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

  return (
   <div className="flex flex-col gap-4">
    <div className="shadow-xl shadow-neutral-200 rounded-b-xl" style={{height:500, width:'100%'}}>
      <AgGridReact<Job>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        theme={myTheme}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
    </div>
  );
}
