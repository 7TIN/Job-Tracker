"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { CellValueChangedEvent, ColDef, themeQuartz } from "ag-grid-community";
import { Job } from "@/types/job";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { createJob, updateJob } from "@/app/dashboard/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Check, Loader2, PlusCircle, X } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  accentColor: "#087AD1",
  backgroundColor: "#FFFFFF",
  borderColor: "#D7E2E6",
  borderRadius: 2,
  browserColorScheme: "light",
  cellHorizontalPaddingScale: 1,
  chromeBackgroundColor: {
    ref: "backgroundColor",
  },
  columnBorder: true,
  fontSize: 13,
  foregroundColor: "#555B62",
  headerBackgroundColor: "#FFFFFF",
  headerFontSize: 13,
  headerFontWeight: 400,
  headerTextColor: "#84868B",
  rowBorder: true,
  rowVerticalPaddingScale: 0.8,
  sidePanelBorder: true,
  spacing: 6,
  wrapperBorder: true,
  wrapperBorderRadius: 10,
});

type Props = {
  data: Job[];
};

export default function JobGrid({ data }: Props) {
  const gridRef = useRef<AgGridReact<Job>>(null);
  const [rowData, setRowData] = useState<Job[]>(data);

  const [tempRowId, setTempRowId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [dirtyRowId, setDirtyRowId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const originalRowData = useRef<Job | null>(null);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const [columnDefs] = useState<ColDef<Job>[]>([
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      width: 60,
      suppressMovable: true,
      pinned: "left",
    },
    { headerName: "Company", field: "company", editable: true },
    { headerName: "Position", field: "position", editable: true },
    {
      headerName: "Applied Date",
      field: "appliedDate",
      editable: true,
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        return params.value || "";
      },
      valueParser: (params) => {
        if (!params.newValue) return null;

        // Convert incoming Date/string into YYYY-MM-DD string
        const d = new Date(params.newValue);
        if (isNaN(d.getTime())) return null;

        return d.toISOString().split("T")[0]; // always a string
      },
    },
    { headerName: "Platform", field: "platform", editable: true },
    {
      headerName: "Status",
      field: "status",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Applied",
          "Interviewing",
          "Assessment",
          "Offer",
          "Rejected",
          "Wishlist",
        ],
      },
    },
    { headerName: "Location", field: "location", editable: true },
    { headerName: "Salary", field: "salary", editable: true },
    { headerName: "Notes", field: "notes", editable: true, flex: 2 },
    { headerName: "Link", field: "applicationLink", editable: true },
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

    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const newRow: Job = {
      id: `temp_${crypto.randomUUID()}`,
      company: "",
      position: "",
      // appliedDate: new Date().toISOString().split("T")[0],
      appliedDate: todayString,
      status: "Applied",
      platform: "",
      applicationLink: "",
      location: "undisclosed",
      salary: "0",
      notes: " ",
      userId: "",
    };

    setTempRowId(newRow.id);

    gridRef.current?.api.applyTransaction({
      add: [newRow],
      // addIndex: 0,
    });
  };

  const handleSaveRow = async () => {
    if (!tempRowId) return;
    setIsSaving(true);

    const gridApi = gridRef.current?.api;
    if (!gridApi) {
      setIsSaving(false);
      return;
    }

    gridApi.stopEditing();

    const rowNode = gridApi.getRowNode(tempRowId);

    if (!rowNode || !rowNode.data) {
      toast.error("Could not find the new row to save.");
      return;
    }

    // const rowData = rowNode.data;
    // const result = await createJob(rowData);

    // if (result.error) {
    //   toast.error('Failed to save job', { description: result.error });
    // } else if (result.success && result.data) {
    //   toast.success('Job saved successfully!');

    //   gridApi.applyTransaction({
    //     update: [result.data],
    //   });

    //   gridApi.refreshClientSideRowModel('sort');

    //   setTempRowId(null);
    // }
    try {
      const result = await createJob(rowNode.data);

      if (result.error) {
        toast.error("Failed to save job", { description: result.error });
      } else if (result.success && result.data) {
        toast.success("Job saved successfully!");

        gridApi.applyTransaction({
          update: [result.data],
        });

        // Flash the cells of the newly saved row for visual feedback
        const updatedNode = gridApi.getRowNode(result.data.id);
        if (updatedNode) {
          gridApi.flashCells({ rowNodes: [updatedNode] });
        }

        gridApi.refreshClientSideRowModel("sort");
        setTempRowId(null); // Hide Save/Cancel buttons
      }
    } catch (error) {
      toast.error("An unexpected error occurred while saving." + error);
    } finally {
      setIsSaving(false); // Ensure loading state is always turned off
    }
  };

  const handleCancelAdd = () => {
    if (!tempRowId) return;

    const gridApi = gridRef.current?.api;
    const rowNode = gridApi?.getRowNode(tempRowId);

    if (rowNode && rowNode.data) {
      gridApi?.applyTransaction({
        remove: [rowNode.data],
      });
    }
    setTempRowId(null);
  };

  const onCellValueChanged = (event: CellValueChangedEvent<Job>) => {
    if (event.data.id.toString().startsWith("temp_")) return;
    if (!dirtyRowId) {
      originalRowData.current = { ...event.data };
    }
    setDirtyRowId(event.data.id);
  };

  const handleUpdateRow = async () => {
    if (!dirtyRowId) return;
    setIsUpdating(true);

    const gridApi = gridRef.current?.api;
    if (!gridApi) {
      setIsUpdating(false);
      return;
    }

    const rowNode = gridApi.getRowNode(dirtyRowId);
    if (!rowNode || !rowNode.data) {
      toast.error("Could not find the row to update.");
      setIsUpdating(false);
      return;
    }

    try {
      // const dataToSend = { ...rowNode.data };

      // if (dataToSend.appliedDate) {
      //   const d = new Date(dataToSend.appliedDate);
      //   if (!isNaN(d.getTime())) {
      //     dataToSend.appliedDate = d.toISOString().split("T")[0];
      //   } else {
      //     dataToSend.appliedDate = null;
      //   }
      // }

      const result = await updateJob(rowNode.data);

      if (result.error) {
        toast.error("Failed to update job", { description: result.error });
      } else if (result.success && result.data) {
        toast.success("Job updated successfully!");

        gridApi.applyTransaction({ update: [result.data] });
        gridApi.flashCells({ rowNodes: [rowNode] });

        setDirtyRowId(null);

        originalRowData.current = null;
      }
    } catch (error) {
      toast.error("An unexpected error occurred during update." + error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelUpdate = () => {
    if (!dirtyRowId || !originalRowData.current) return;
    const gridApi = gridRef.current?.api;
    if (!gridApi) return;

    // Revert the row to its original state
    gridApi.applyTransaction({ update: [originalRowData.current] });
    setDirtyRowId(null);
    originalRowData.current = null;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {!tempRowId && !dirtyRowId && (
          <Button onClick={handleAddRow} className="w-fit">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Job
          </Button>
        )}
        {tempRowId && (
          <>
            <Button
              onClick={handleSaveRow}
              disabled={isSaving}
              className="w-fit"
              variant="outline"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4 text-green-600" />
              )}
              Save
            </Button>
            <Button
              onClick={handleCancelAdd}
              disabled={isSaving}
              className="w-fit"
              variant="ghost"
            >
              <X className="mr-2 h-4 w-4 text-red-600" /> Cancel
            </Button>
          </>
        )}
        {dirtyRowId && (
          <>
            <Button
              onClick={handleUpdateRow}
              disabled={isUpdating}
              className="w-fit"
              variant="outline"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4 text-green-600" />
              )}
              Update
            </Button>
            <Button
              onClick={handleCancelUpdate}
              disabled={isUpdating}
              className="w-fit"
              variant="ghost"
            >
              <X className="mr-2 h-4 w-4 text-red-600" /> Cancel Update
            </Button>
          </>
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
          onCellValueChanged={onCellValueChanged}
          // editType="fullRow"
        />
      </div>
    </div>
  );
}
