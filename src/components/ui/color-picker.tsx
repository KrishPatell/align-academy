"use client"

import * as React from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PRESET_COLORS = [
  // Reds
  "#ef4444", "#dc2626", "#b91c1c", "#991b1b",
  // Oranges
  "#f97316", "#ea580c", "#c2410c", "#9a3412",
  // Yellows
  "#eab308", "#ca8a04", "#a16207", "#854d0e",
  // Greens
  "#22c55e", "#16a34a", "#15803d", "#166534",
  // Teals
  "#14b8a6", "#0d9488", "#0f766e", "#115e59",
  // Blues
  "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af",
  // Purples
  "#a855f7", "#9333ea", "#7e22ce", "#6b21a8",
  // Pinks
  "#ec4899", "#db2777", "#be185d", "#9d174d",
  // Grays
  "#6b7280", "#4b5563", "#374151", "#1f2937",
  // Black & White
  "#000000", "#ffffff",
]

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  className?: string
  label?: string
}

function ColorPicker({
  value = "#3b82f6",
  onChange,
  className,
  label = "Pick a color"
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState(value)
  const [customColor, setCustomColor] = React.useState(value)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    setCustomColor(color)
    onChange?.(color)
  }

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color)
    setSelectedColor(color)
    onChange?.(color)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start gap-2", className)}
        >
          <div
            className="h-4 w-4 rounded border border-input"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-muted-foreground">{selectedColor}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-3">
          <div className="text-sm font-medium">{label}</div>
          
          {/* Preset Colors Grid */}
          <div className="grid grid-cols-8 gap-1">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                className={cn(
                  "h-6 w-6 rounded border transition-transform hover:scale-110",
                  selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : "border-input"
                )}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleCustomColorChange(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border border-input p-0.5"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => {
                const val = e.target.value
                if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                  handleCustomColorChange(val)
                }
              }}
              className="flex-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { ColorPicker, PRESET_COLORS }
