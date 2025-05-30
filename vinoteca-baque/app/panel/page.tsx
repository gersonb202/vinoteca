"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  CalendarIcon,
  FileText,
  Home,
  Package,
  PieChart,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-6">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <ShoppingCart className="h-6 w-6" />
              <span>Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "dashboard"}
                  onClick={() => setActiveSection("dashboard")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeSection === "reports"} onClick={() => setActiveSection("reports")}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Reportes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeSection === "users"} onClick={() => setActiveSection("users")}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Usuarios</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeSection === "products"} onClick={() => setActiveSection("products")}>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Productos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeSection === "waste"} onClick={() => setActiveSection("waste")}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Mermas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "statistics"}
                  onClick={() => setActiveSection("statistics")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Estadísticas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {activeSection === "dashboard" && "Panel Principal"}
                {activeSection === "reports" && "Reportes"}
                {activeSection === "users" && "Gestión de Usuarios"}
                {activeSection === "products" && "Gestión de Productos"}
                {activeSection === "waste" && "Control de Mermas"}
                {activeSection === "statistics" && "Estadísticas de Venta"}
              </h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {activeSection === "dashboard" && <DashboardContent />}
            {activeSection === "reports" && <ReportsContent />}
            {activeSection === "users" && <UsersContent />}
            {activeSection === "products" && <ProductsContent />}
            {activeSection === "waste" && <WasteContent />}
            {activeSection === "statistics" && <StatisticsContent />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function DashboardContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% del mes pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <p className="text-xs text-muted-foreground">+8.5% del mes pasado</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Productos</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,245</div>
          <p className="text-xs text-muted-foreground">+12 nuevos productos</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mermas</CardTitle>
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2,345</div>
          <p className="text-xs text-muted-foreground">-5% del mes pasado</p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText className="h-6 w-6" />
            <span>Generar Reporte</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center gap-2">
            <UserPlus className="h-6 w-6" />
            <span>Alta de Usuario</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center gap-2">
            <Plus className="h-6 w-6" />
            <span>Alta de Producto</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center gap-2">
            <PieChart className="h-6 w-6" />
            <span>Ver Estadísticas</span>
          </Button>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Resumen de Ventas</CardTitle>
          <CardDescription>Ventas de los últimos 7 días</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <div className="w-full h-full bg-muted/50 rounded-md flex items-center justify-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReportsContent() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Reportes</CardTitle>
          <CardDescription>Genera y visualiza reportes del sistema</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Reporte de Ventas
          </Button>
          <Button className="justify-start">
            <Users className="mr-2 h-4 w-4" />
            Reporte de Usuarios
          </Button>
          <Button className="justify-start">
            <Package className="mr-2 h-4 w-4" />
            Reporte de Inventario
          </Button>
          <Button className="justify-start">
            <Trash2 className="mr-2 h-4 w-4" />
            Reporte de Mermas
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function UsersContent() {
  const [users, setUsers] = useState([
    { id: 1, name: "Usuario 1", email: "usuario1@ejemplo.com", role: "Administrador" },
    { id: 2, name: "Usuario 2", email: "usuario2@ejemplo.com", role: "Vendedor" },
    { id: 3, name: "Usuario 3", email: "usuario3@ejemplo.com", role: "Administrador" },
    { id: 4, name: "Usuario 4", email: "usuario4@ejemplo.com", role: "Vendedor" },
    { id: 5, name: "Usuario 5", email: "usuario5@ejemplo.com", role: "Vendedor" },
  ])

  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Vendedor",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Vendedor",
    })
  }

  const handleAddUser = () => {
    // Validación básica
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    // Agregar nuevo usuario
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
    }

    setUsers([...users, newUser])
    setIsAddUserOpen(false)
    resetForm()

    toast({
      title: "Usuario agregado",
      description: "El usuario ha sido agregado exitosamente",
    })
  }

  const handleEditUser = () => {
    if (!currentUser) return

    // Validación básica
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    // Actualizar usuario
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }
      }
      return user
    })

    setUsers(updatedUsers)
    setIsEditUserOpen(false)
    setCurrentUser(null)
    resetForm()

    toast({
      title: "Usuario actualizado",
      description: "El usuario ha sido actualizado exitosamente",
    })
  }

  const handleDeleteUser = () => {
    if (!currentUser) return

    // Eliminar usuario
    const updatedUsers = users.filter((user) => user.id !== currentUser.id)
    setUsers(updatedUsers)
    setIsDeleteUserOpen(false)
    setCurrentUser(null)

    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado exitosamente",
    })
  }

  const openEditModal = (user: any) => {
    setCurrentUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      role: user.role,
    })
    setIsEditUserOpen(true)
  }

  const openDeleteModal = (user: any) => {
    setCurrentUser(user)
    setIsDeleteUserOpen(true)
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>Administra los usuarios del sistema</CardDescription>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Alta de Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                <DialogDescription>Completa el formulario para crear un nuevo usuario en el sistema.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select value={formData.role} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Vendedor">Vendedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddUser}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal de Edición */}
          <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogDescription>Actualiza la información del usuario.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nombre</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Correo Electrónico</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-password">Nueva Contraseña (opcional)</Label>
                  <Input
                    id="edit-password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-confirmPassword">Confirmar Nueva Contraseña</Label>
                  <Input
                    id="edit-confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Rol</Label>
                  <Select value={formData.role} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Vendedor">Vendedor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEditUser}>Actualizar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal de Eliminación */}
          <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Eliminar Usuario</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              {currentUser && (
                <div className="py-4">
                  <p>
                    <strong>Nombre:</strong> {currentUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p>
                    <strong>Rol:</strong> {currentUser.role}
                  </p>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleDeleteUser}>
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-4 p-4 font-medium border-b">
              <div>Nombre</div>
              <div>Email</div>
              <div>Rol</div>
              <div>Acciones</div>
            </div>
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-4 p-4 border-b last:border-0">
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.role}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(user)}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(user)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductsContent() {
  const [products, setProducts] = useState([
    { id: 1, code: "PRD-0001", name: "Producto 1", price: 10.99, stock: 15 },
    { id: 2, code: "PRD-0002", name: "Producto 2", price: 21.98, stock: 30 },
    { id: 3, code: "PRD-0003", name: "Producto 3", price: 32.97, stock: 45 },
    { id: 4, code: "PRD-0004", name: "Producto 4", price: 43.96, stock: 60 },
    { id: 5, code: "PRD-0005", name: "Producto 5", price: 54.95, stock: 75 },
  ])

  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    stock: "",
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      price: "",
      stock: "",
      description: "",
    })
  }

  const handleAddProduct = () => {
    // Validación básica
    if (!formData.name || !formData.price || !formData.stock) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    // Generar código automático
    const newCode = `PRD-${(products.length + 1).toString().padStart(4, "0")}`

    // Agregar nuevo producto
    const newProduct = {
      id: products.length + 1,
      code: formData.code || newCode,
      name: formData.name,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
    }

    setProducts([...products, newProduct])
    setIsAddProductOpen(false)
    resetForm()

    toast({
      title: "Producto agregado",
      description: "El producto ha sido agregado exitosamente",
    })
  }

  const handleEditProduct = () => {
    if (!currentProduct) return

    // Validación básica
    if (!formData.name || !formData.price || !formData.stock) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    // Actualizar producto
    const updatedProducts = products.map((product) => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          code: formData.code,
          name: formData.name,
          price: Number.parseFloat(formData.price),
          stock: Number.parseInt(formData.stock),
        }
      }
      return product
    })

    setProducts(updatedProducts)
    setIsEditProductOpen(false)
    setCurrentProduct(null)
    resetForm()

    toast({
      title: "Producto actualizado",
      description: "El producto ha sido actualizado exitosamente",
    })
  }

  const handleDeleteProduct = () => {
    if (!currentProduct) return

    // Eliminar producto
    const updatedProducts = products.filter((product) => product.id !== currentProduct.id)
    setProducts(updatedProducts)
    setIsDeleteProductOpen(false)
    setCurrentProduct(null)

    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado exitosamente",
    })
  }

  const openEditModal = (product: any) => {
    setCurrentProduct(product)
    setFormData({
      code: product.code,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: "",
    })
    setIsEditProductOpen(true)
  }

  const openDeleteModal = (product: any) => {
    setCurrentProduct(product)
    setIsDeleteProductOpen(true)
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestión de Productos</CardTitle>
            <CardDescription>Administra el catálogo de productos</CardDescription>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Alta de Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                <DialogDescription>
                  Completa el formulario para crear un nuevo producto en el sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nombre del producto"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Código (opcional)</Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="Se generará automáticamente si se deja vacío"
                    value={formData.code}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descripción del producto"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal de Edición */}
          <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogDescription>Actualiza la información del producto.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nombre del Producto</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    placeholder="Nombre del producto"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-code">Código</Label>
                  <Input id="edit-code" name="code" value={formData.code} onChange={handleInputChange} disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Precio</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    name="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Descripción (opcional)</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    placeholder="Descripción del producto"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEditProduct}>Actualizar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal de Eliminación */}
          <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Eliminar Producto</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              {currentProduct && (
                <div className="py-4">
                  <p>
                    <strong>Código:</strong> {currentProduct.code}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {currentProduct.name}
                  </p>
                  <p>
                    <strong>Precio:</strong> ${currentProduct.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Stock:</strong> {currentProduct.stock}
                  </p>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteProductOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleDeleteProduct}>
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>Código</div>
              <div>Nombre</div>
              <div>Precio</div>
              <div>Stock</div>
              <div>Acciones</div>
            </div>
            {products.map((product) => (
              <div key={product.id} className="grid grid-cols-5 p-4 border-b last:border-0">
                <div>{product.code}</div>
                <div>{product.name}</div>
                <div>${product.price.toFixed(2)}</div>
                <div>{product.stock}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(product)}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteModal(product)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WasteContent() {
  const [wastes, setWastes] = useState([
    { id: 1, date: "1/03/2025", user: "Admin 1", product: "Producto 1", quantity: 2, reason: "Caducidad", value: 25.5 },
    { id: 2, date: "2/03/2025", user: "Admin 2", product: "Producto 2", quantity: 4, reason: "Daño", value: 51.0 },
    { id: 3, date: "3/03/2025", user: "Admin 3", product: "Producto 3", quantity: 6, reason: "Caducidad", value: 76.5 },
    { id: 4, date: "4/03/2025", user: "Admin 1", product: "Producto 4", quantity: 8, reason: "Daño", value: 102.0 },
    {
      id: 5,
      date: "5/03/2025",
      user: "Admin 2",
      product: "Producto 5",
      quantity: 10,
      reason: "Caducidad",
      value: 127.5,
    },
  ])

  const [isAddWasteOpen, setIsAddWasteOpen] = useState(false)
  const [isViewWasteOpen, setIsViewWasteOpen] = useState(false)
  const [currentWaste, setCurrentWaste] = useState<any>(null)

  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    reason: "Caducidad",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, reason: value }))
  }

  const resetForm = () => {
    setFormData({
      product: "",
      quantity: "",
      reason: "Caducidad",
      notes: "",
    })
  }

  const handleAddWaste = () => {
    // Validación básica
    if (!formData.product || !formData.quantity) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    // Calcular valor (simulado)
    const quantity = Number.parseInt(formData.quantity)
    const unitPrice = 12.75 // Precio unitario simulado
    const value = quantity * unitPrice

    // Fecha actual
    const today = new Date()
    const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

    // Agregar nueva merma
    const newWaste = {
      id: wastes.length + 1,
      date: dateStr,
      user: "Admin 1", // Usuario actual (simulado)
      product: formData.product,
      quantity: quantity,
      reason: formData.reason,
      value: value,
    }

    setWastes([...wastes, newWaste])
    setIsAddWasteOpen(false)
    resetForm()

    toast({
      title: "Merma registrada",
      description: "La merma ha sido registrada exitosamente",
    })
  }

  const viewWasteDetails = (waste: any) => {
    setCurrentWaste(waste)
    setIsViewWasteOpen(true)
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Control de Mermas</CardTitle>
            <CardDescription>Gestiona las mermas de productos</CardDescription>
          </div>
          <Dialog open={isAddWasteOpen} onOpenChange={setIsAddWasteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Registrar Merma
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Registrar Nueva Merma</DialogTitle>
                <DialogDescription>Completa el formulario para registrar una merma de producto.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="product">Producto</Label>
                  <Input
                    id="product"
                    name="product"
                    placeholder="Nombre del producto"
                    value={formData.product}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Motivo</Label>
                  <Select value={formData.reason} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Caducidad">Caducidad</SelectItem>
                      <SelectItem value="Daño">Daño</SelectItem>
                      <SelectItem value="Robo">Robo</SelectItem>
                      <SelectItem value="Error de inventario">Error de inventario</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notas (opcional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Detalles adicionales"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddWasteOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddWaste}>Registrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal de Visualización */}
          <Dialog open={isViewWasteOpen} onOpenChange={setIsViewWasteOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Detalles de Merma</DialogTitle>
                <DialogDescription>Información detallada de la merma registrada.</DialogDescription>
              </DialogHeader>
              {currentWaste && (
                <div className="py-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Fecha:</div>
                    <div>{currentWaste.date}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Usuario:</div>
                    <div>{currentWaste.user}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Producto:</div>
                    <div>{currentWaste.product}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Cantidad:</div>
                    <div>{currentWaste.quantity}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Motivo:</div>
                    <div>{currentWaste.reason}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Valor:</div>
                    <div>${currentWaste.value.toFixed(2)}</div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button onClick={() => setIsViewWasteOpen(false)}>Cerrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-6 p-4 font-medium border-b">
              <div>Fecha</div>
              <div>Usuario</div>
              <div>Producto</div>
              <div>Cantidad</div>
              <div>Motivo</div>
              <div>Valor</div>
            </div>
            {wastes.map((waste) => (
              <div
                key={waste.id}
                className="grid grid-cols-6 p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                onClick={() => viewWasteDetails(waste)}
              >
                <div>{waste.date}</div>
                <div>{waste.user}</div>
                <div>{waste.product}</div>
                <div>{waste.quantity}</div>
                <div>{waste.reason}</div>
                <div>${waste.value.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatisticsContent() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  // Función para generar datos de ventas aleatorios para el día seleccionado
  const getDailySales = (date: Date | undefined) => {
    if (!date) return { total: 0, items: 0, transactions: 0 }

    // Usar la fecha como semilla para generar datos consistentes
    const day = date.getDate()
    const month = date.getMonth() + 1
    const seed = day * month

    return {
      total: (1000 + ((seed * 43) % 2000)).toFixed(2),
      items: 50 + ((seed * 17) % 100),
      transactions: 10 + ((seed * 7) % 40),
    }
  }

  const dailySales = getDailySales(date)

  // Generar datos de productos más vendidos para el día seleccionado
  const topProducts = [
    { name: "Producto A", sales: 120 + (date?.getDate() || 0) * 2 },
    { name: "Producto B", sales: 95 + (date?.getDate() || 0) * 1.5 },
    { name: "Producto C", sales: 87 + (date?.getDate() || 0) },
    { name: "Producto D", sales: 65 + (date?.getDate() || 0) * 0.5 },
    { name: "Producto E", sales: 42 + (date?.getDate() || 0) * 0.3 },
  ]

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Venta</CardTitle>
          <CardDescription>Análisis de ventas por período</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div>
                <h3 className="text-lg font-medium mb-2">Consulta por día específico</h3>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={es} />
                    </PopoverContent>
                  </Popover>
                  <Button onClick={() => setDate(new Date())}>Hoy</Button>
                </div>
              </div>

              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar producto..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {date && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Ventas del día {format(date, "d 'de' MMMM 'de' yyyy", { locale: es })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Total Vendido</h4>
                      <p className="text-2xl font-bold">${dailySales.total}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Productos Vendidos</h4>
                      <p className="text-2xl font-bold">{dailySales.items}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Transacciones</h4>
                      <p className="text-2xl font-bold">{dailySales.transactions}</p>
                    </div>
                  </div>

                  <h4 className="font-medium mb-3">Productos más vendidos este día</h4>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-3 p-3 font-medium border-b">
                      <div>Producto</div>
                      <div>Unidades</div>
                      <div>Monto</div>
                    </div>
                    {topProducts
                      .filter(
                        (product) =>
                          searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((product, i) => (
                        <div key={i} className="grid grid-cols-3 p-3 border-b last:border-0">
                          <div>{product.name}</div>
                          <div>{product.sales}</div>
                          <div>${(product.sales * 12.99).toFixed(2)}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="h-[300px] bg-muted/50 rounded-md flex items-center justify-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ventas Diarias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,245.89</div>
                  <p className="text-xs text-muted-foreground">+5.2% del día anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ventas Semanales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$8,942.50</div>
                  <p className="text-xs text-muted-foreground">+12.5% de la semana anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ventas Mensuales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% del mes anterior</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

