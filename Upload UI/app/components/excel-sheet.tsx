"use client"

import { useState, useRef, useEffect } from "react"

interface ExcelSheetProps {
  data: any[][]
  headers: string[]
  onDataChange: (newData: any[][]) => void
}

export default function ExcelSheet({ data, headers, onDataChange }: ExcelSheetProps) {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [editValue, setEditValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col })
    setEditValue(data[row]?.[col] || "")
  }

  const handleCellChange = (row: number, col: number, value: string) => {
    const newData = data.map((r, rowIndex) => {
      if (rowIndex === row) {
        const newRow = [...(r || [])]
        newRow[col] = value
        return newRow
      }
      return r
    })
    onDataChange(newData)
  }

  useEffect(() => {
    if (selectedCell && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedCell])

  return (
    <div className="border rounded-lg overflow-auto bg-white">
      <div className="inline-block min-w-full">
        <div className="overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="w-12 bg-gray-100 border-r border-b px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 z-10"></th>
                {headers.map((header, index) => (
                  <th
                    key={header}
                    className="bg-gray-100 border-r border-b px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(100)
                .fill(null)
                .map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border-r border-b px-3 py-2 text-sm text-gray-500 bg-gray-50 sticky left-0">
                      {rowIndex + 1}
                    </td>
                    {headers.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border-r border-b relative min-w-[100px] ${
                          selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? "bg-blue-50" : ""
                        }`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? (
                          <input
                            ref={inputRef}
                            type="text"
                            className="absolute inset-0 w-full h-full px-3 py-2 border-2 border-blue-500 outline-none"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => {
                              handleCellChange(rowIndex, colIndex, editValue)
                              setSelectedCell(null)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleCellChange(rowIndex, colIndex, editValue)
                                setSelectedCell(null)
                              }
                            }}
                          />
                        ) : (
                          <div className="px-3 py-2">{data[rowIndex]?.[colIndex] || ""}</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

