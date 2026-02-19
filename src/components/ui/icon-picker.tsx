"use client"

import * as React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverDescription,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"

const ICON_CATEGORIES = {
  "Actions": ["Plus", "Minus", "Check", "X", "Edit", "Trash2", "Copy", "Cut", "Paste", "Undo", "Redo", "Save", "Download", "Upload", "Refresh", "RotateCcw", "RotateCw"],
  "Navigation": ["Home", "Menu", "Hamburger", "ChevronDown", "ChevronUp", "ChevronLeft", "ChevronRight", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "MoreHorizontal", "MoreVertical", "Grid", "List", "PanelLeft", "PanelRight"],
  "Communication": ["MessageSquare", "Mail", "Phone", "Camera", "Video", "Mic", "Bell", "BellOff", "User", "Users", "UserPlus", "UserMinus", "Share", "Share2", "AtSign", "Hash"],
  "Files & Data": ["File", "FileText", "Folder", "FolderOpen", "FilePlus", "FileMinus", "FileEdit", "Trash", "Archive", "Database", "HardDrive", "Cloud", "CloudUpload", "CloudDownload"],
  "UI Elements": ["Search", "Filter", "Sort", "Settings", "Sliders", "ToggleLeft", "ToggleRight", "CheckSquare", "Square", "Circle", "Dot", "Star", "Heart", "Flag", "Tag", "Bookmark"],
  "Media": ["Image", "Music", "Volume2", "VolumeX", "Play", "Pause", "SkipBack", "SkipForward", "Rewind", "FastForward", "Shuffle", "Repeat", "Monitor", "Tv", "Film"],
  "Status": ["CheckCircle", "XCircle", "AlertCircle", "AlertTriangle", "Info", "HelpCircle", "Loader", "Clock", "Calendar", "Zap", "Flame", "Snowflake", "Sun", "Moon", "Cloud"],
  "Finance & Business": ["DollarSign", "Euro", "PoundSign", "CreditCard", "Banknote", "Wallet", "PieChart", "BarChart", "TrendingUp", "TrendingDown", "Briefcase", "Building", "Store", "ShoppingCart", "Package"],
}

interface IconPickerProps {
  value?: string
  onChange?: (iconName: string) => void
  className?: string
  label?: string
}

function IconPicker({
  value,
  onChange,
  className,
  label = "Pick an icon"
}: IconPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedIcon, setSelectedIcon] = React.useState(value || "Star")

  const filteredCategories = React.useMemo(() => {
    if (!search) return ICON_CATEGORIES
    
    const result: Record<string, string[]> = {}
    const searchLower = search.toLowerCase()
    
    for (const [category, icons] of Object.entries(ICON_CATEGORIES)) {
      const filtered = icons.filter(icon => 
        icon.toLowerCase().includes(searchLower)
      )
      if (filtered.length > 0) {
        result[category] = filtered
      }
    }
    
    return result
  }, [search])

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName)
    onChange?.(iconName)
    setOpen(false)
  }

  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[selectedIcon]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start gap-2", className)}
        >
          {IconComponent ? (
            <IconComponent className="h-4 w-4" />
          ) : (
            <LucideIcons.Star className="h-4 w-4" />
          )}
          <span className="text-muted-foreground">{selectedIcon}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-3">
          <div className="text-sm font-medium">{label}</div>
          
          {/* Search */}
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />

          {/* Categories with Icons */}
          <div className="max-h-64 overflow-y-auto space-y-3">
            {Object.entries(filteredCategories).map(([category, icons]) => (
              <div key={category}>
                <div className="text-xs font-medium text-muted-foreground mb-1.5">
                  {category}
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {icons.map((iconName) => {
                    const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
                    return (
                      <button
                        key={iconName}
                        className={cn(
                          "p-1.5 rounded flex items-center justify-center transition-colors hover:bg-accent",
                          selectedIcon === iconName && "bg-accent text-accent-foreground"
                        )}
                        onClick={() => handleIconSelect(iconName)}
                        title={iconName}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            
            {Object.keys(filteredCategories).length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">
                No icons found
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { IconPicker, ICON_CATEGORIES }
