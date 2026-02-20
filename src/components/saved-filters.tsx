"use client";

import { useState, useEffect } from "react";
import { Save, Filter, Trash2, Check, ChevronDown, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, any>;
  createdAt: string;
  isDefault?: boolean;
}

interface SavedFiltersProps {
  currentFilters: Record<string, any>;
  onApplyFilter: (filters: Record<string, any>) => void;
  onClearFilters: () => void;
  storageKey?: string;
}

export function SavedFilters({ 
  currentFilters, 
  onApplyFilter, 
  onClearFilters,
  storageKey = "savedFilters" 
}: SavedFiltersProps) {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [newFilterName, setNewFilterName] = useState("");
  const [isDefaultFilter, setIsDefaultFilter] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Load saved filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setSavedFilters(JSON.parse(saved));
    }
    // Check if there are active filters
    const hasFilters = Object.keys(currentFilters).some(
      key => currentFilters[key] !== undefined && currentFilters[key] !== "" && currentFilters[key] !== "all"
    );
    setHasActiveFilters(hasFilters);
  }, [storageKey, currentFilters]);

  const saveFilter = () => {
    if (!newFilterName.trim()) return;
    
    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: newFilterName.trim(),
      filters: { ...currentFilters },
      createdAt: new Date().toISOString(),
      isDefault: isDefaultFilter,
    };

    let updatedFilters = [...savedFilters];
    
    // If setting as default, remove default from others
    if (isDefaultFilter) {
      updatedFilters = updatedFilters.map(f => ({ ...f, isDefault: false }));
    }
    
    updatedFilters.push(newFilter);
    setSavedFilters(updatedFilters);
    localStorage.setItem(storageKey, JSON.stringify(updatedFilters));
    
    setNewFilterName("");
    setIsDefaultFilter(false);
    setIsSaveDialogOpen(false);
  };

  const deleteFilter = (id: string) => {
    const updatedFilters = savedFilters.filter(f => f.id !== id);
    setSavedFilters(updatedFilters);
    localStorage.setItem(storageKey, JSON.stringify(updatedFilters));
  };

  const applyFilter = (filter: SavedFilter) => {
    onApplyFilter(filter.filters);
  };

  const setAsDefault = (id: string) => {
    const updatedFilters = savedFilters.map(f => ({
      ...f,
      isDefault: f.id === id
    }));
    setSavedFilters(updatedFilters);
    localStorage.setItem(storageKey, JSON.stringify(updatedFilters));
  };

  const defaultFilter = savedFilters.find(f => f.isDefault);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
          >
            <Bookmark className="h-4 w-4" />
            <span>Saved Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">
                {Object.keys(currentFilters).filter(k => currentFilters[k] !== "all" && currentFilters[k] !== "").length}
              </span>
            )}
            <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {/* Current Filters Status */}
          {hasActiveFilters && (
            <>
              <DropdownMenuItem onClick={onClearFilters} className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Clear Current Filters</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setIsSaveDialogOpen(true)}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Current Filters</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {/* Saved Filters List */}
          {savedFilters.length > 0 ? (
            <>
              <div className="px-2 py-1.5">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Saved Filters
                </p>
              </div>
              {defaultFilter && (
                <DropdownMenuItem 
                  onClick={() => applyFilter(defaultFilter)}
                  className="gap-2 cursor-pointer"
                >
                  <BookmarkCheck className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">{defaultFilter.name}</span>
                  <span className="ml-auto text-xs text-slate-400">(Default)</span>
                </DropdownMenuItem>
              )}
              {savedFilters.map((filter) => (
                <DropdownMenuItem
                  key={filter.id}
                  onClick={() => applyFilter(filter)}
                  className="gap-2 cursor-pointer"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="flex-1">{filter.name}</span>
                  <div className="flex items-center gap-1">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {!filter.isDefault && (
                          <DropdownMenuItem onClick={() => setAsDefault(filter.id)}>
                            Set as Default
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={(e) => { e.stopPropagation(); deleteFilter(filter.id); }}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </div>
                </DropdownMenuItem>
              ))}
            </>
          ) : (
            <div className="p-4 text-center text-slate-500">
              <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No saved filters</p>
              <p className="text-xs mt-1">Save your current filters for quick access</p>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Save Filter Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Save Filter</DialogTitle>
            <DialogDescription>
              Save your current filter settings for quick access later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filterName">Filter Name</Label>
              <Input 
                id="filterName"
                placeholder="e.g., Active Clients, This Month's Invoices"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Current Filters</p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                {Object.entries(currentFilters)
                  .filter(([_, value]) => value !== "all" && value !== "")
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm py-1">
                      <span className="text-slate-500 capitalize">{key}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                {Object.entries(currentFilters).filter(([_, value]) => value !== "all" && value !== "").length === 0 && (
                  <p className="text-sm text-slate-400">No active filters</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="defaultFilter"
                checked={isDefaultFilter}
                onChange={(e) => setIsDefaultFilter(e.target.checked)}
                className="rounded border-slate-300"
              />
              <Label htmlFor="defaultFilter" className="text-sm font-normal">
                Set as default filter
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={saveFilter}
              disabled={!newFilterName.trim()}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SavedFilters;
