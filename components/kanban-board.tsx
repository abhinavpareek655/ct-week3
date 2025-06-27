"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, ChevronLeft, ChevronRight} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useRef } from "react"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  assignee: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Design new landing page",
        description: "Create wireframes and mockups",
        priority: "high",
        assignee: "John Doe",
      },
      {
        id: "2",
        title: "Fix login bug",
        description: "Users can't log in with Google",
        priority: "medium",
        assignee: "Jane Smith",
      },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Implement user dashboard",
        description: "Build the main dashboard interface",
        priority: "high",
        assignee: "Mike Johnson",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "4",
        title: "Update documentation",
        description: "Add new API endpoints to docs",
        priority: "low",
        assignee: "Sarah Wilson",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "5",
        title: "Setup CI/CD pipeline",
        description: "Configure automated deployment",
        priority: "medium",
        assignee: "Tom Brown",
      },
    ],
  },
]

const titleVariants = {
  expanded: { 
    rotate: 0, 
    x: 0,       // end x position (e.g., 0 for original position)
    y: 0,       // end y position
    opacity: 1, 
    transition: { type: "slide", stiffness: 300, damping: 30 } 
  },
  collapsed: { 
    rotate: 90, 
    x: -90,     
    y: 90,      
    opacity: 1, 
    transition: { type: "slide", stiffness: 300, damping: 30 } 
  },
}

const buttonVariants = {
  expanded: { x: 0, opacity: 1, transition: { type: "slide", stiffness: 300 } },
  collapsed: { x: -205, y: -10, opacity: 1, transition: { type: "slide", stiffness: 300 } },
}

const cardVariants = {
  expanded: {
    width: 250,
    height: "auto",
    transition: { type: "slide", stiffness: 300, damping: 30 },
  },
  collapsed: {
    width: 60,  
    height: 250,
    transition: { type: "slide", stiffness: 300, damping: 30 },
  },
}

export function KanbanBoard() {
  const [columns, setColumns] = React.useState<Column[]>(initialData)
  const [draggedTask, setDraggedTask] = React.useState<Task | null>(null)
  const [draggedFrom, setDraggedFrom] = React.useState<string | null>(null)
  const [collapsedColumns, setCollapsedColumns] = React.useState<string[]>([])

  const toggleCollapse = (columnId: string) => {
    setCollapsedColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    )
  }

  const handleDragStart = (e: React.DragEvent, task: Task, columnId: string) => {
    setDraggedTask(task)
    setDraggedFrom(columnId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()

    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      setDraggedTask(null)
      setDraggedFrom(null)
      return
    }

    setColumns((prev) => {
      const newColumns = prev.map((column) => {
        if (column.id === draggedFrom) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
          }
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, draggedTask],
          }
        }
        return column
      })
      return newColumns
    })

    setDraggedTask(null)
    setDraggedFrom(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {columns.map(column => {
        const isCollapsed = collapsedColumns.includes(column.id)
        const animState = isCollapsed ? "collapsed" : "expanded"
        return (
          <div
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, column.id)}
          >
            {isCollapsed ? (
              <motion.div
                initial="expanded"
                animate={animState}
                variants={cardVariants}>
                <Card style={{height:250}}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <motion.div
                        className="flex flex-row items-center m-5"
                        variants={titleVariants}
                        animate={animState}
                      >
                        <CardTitle className="text-sm font-medium" style={{ width: 150 }}>
                          {column.title}
                          <Badge variant="secondary" className="ml-2">
                            {column.tasks.length}
                          </Badge>
                        </CardTitle>
                      </motion.div>
                      <div className="flex items-center space-x-1">
                        <motion.div variants={buttonVariants} animate={animState}>
                          <Button variant="ghost" size="sm" onClick={() => toggleCollapse(column.id)}>
                            <ChevronRight  className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial="expanded"
                animate={animState}
                variants={cardVariants}>
              <Card style={{ minWidth: 250 }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <motion.div
                        variants={titleVariants}
                        animate={animState}
                      >
                        <CardTitle className="text-sm font-medium">
                          {column.title}
                          <Badge variant="secondary" className="ml-2">
                            {column.tasks.length}
                          </Badge>
                        </CardTitle>
                      </motion.div>
                    <div className="flex items-center space-x-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-80">
                          <AddTaskForm onAdd={task => setColumns(cols => cols.map(col => col.id === column.id ? { ...col, tasks: [...col.tasks, task] } : col))} />
                        </PopoverContent>
                      </Popover>
                      <motion.div variants={buttonVariants} animate={animState}>
                        <Button variant="ghost" size="sm" onClick={() => toggleCollapse(column.id)}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {column.tasks.map(task => (
                    <Card
                      key={task.id}
                      className="cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={e => handleDragStart(e, task, column.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <EditTaskPopover
                                task={task}
                                onEdit={updatedTask => setColumns(cols => cols.map(col => col.id === column.id ? { ...col, tasks: col.tasks.map(t => t.id === task.id ? updatedTask : t) } : col))}
                              />
                              <DropdownMenuItem
                                onClick={() => setColumns(cols => cols.map(col => col.id === column.id ? { ...col, tasks: col.tasks.filter(t => t.id !== task.id) } : col))}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {column.tasks.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">No tasks</div>
                  )}
                </CardContent>
              </Card>
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function AddTaskForm({ onAdd }: { onAdd: (task: Task) => void }) {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [priority, setPriority] = React.useState<"low"|"medium"|"high">("medium")
  const [assignee, setAssignee] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const newTask: Task = {
      id: Math.random().toString(36).slice(2),
      title,
      description,
      priority,
      assignee,
    }
    onAdd(newTask)
    setTitle("")
    setDescription("")
    setPriority("medium")
    setAssignee("")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
      />
      <div className="flex gap-2">
        <Select value={priority} onValueChange={v => setPriority(v as any)}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Assignee"
          value={assignee}
          onChange={e => setAssignee(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={loading || !title} className="w-full">
        Add Task
      </Button>
    </form>
  )
}

function EditTaskPopover({ task, onEdit }: { task: Task, onEdit: (task: Task) => void }) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState(task.title)
  const [description, setDescription] = React.useState(task.description)
  const [priority, setPriority] = React.useState<"low"|"medium"|"high">(task.priority)
  const [assignee, setAssignee] = React.useState(task.assignee)
  const [loading, setLoading] = React.useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    onEdit({
      ...task,
      title,
      description,
      priority,
      assignee,
    })
    setLoading(false)
    setOpen(false)
  }

  function handleEditClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <DropdownMenuItem asChild>
          <button
            ref={triggerRef}
            type="button"
            className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </DropdownMenuItem>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2">
            <Select value={priority} onValueChange={v => setPriority(v as any)}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Assignee"
              value={assignee}
              onChange={e => setAssignee(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading || !title} className="w-full">
            Update Task
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
