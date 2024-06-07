import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  appbar,
  button_container,
  captions,
  create_container,
  delete_update_container,
  error,
  field,
  field_container,
  form_container,
  form_fields,
  header,
  header_read,
  read_container,
  rol,
  state_container,
  success,
  title,
  title_container,
  toolbar,
} from "./Crud.styles";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputTextForm from "@components/InputText/InputTextForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register_btn } from "@pages/Login/Login.styles";
import {
  CreateNewProductType,
  DeleteProductType,
  GetAllProductsType,
  UpdateProductType,
} from "@services/services_types/Crud.types";
import { useMutation, useQuery } from "@tanstack/react-query";

type user = {
  id: number;
  name: string;
  paternalSurname: string;
  email: string;
  rol: number;
};

type FormInputs = {
  name: string;
  model: string;
  price: number;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  model: yup.string().required("Campo requerido"),
  price: yup.number().required("Campo requerido"),
});

type Props = {
  CreateNewProductService: CreateNewProductType;
  GetAllProductsService: GetAllProductsType;
  DeleteProductService: DeleteProductType;
  UpdateProductService: UpdateProductType;
};

const Crud = ({
  CreateNewProductService,
  GetAllProductsService,
  DeleteProductService,
  UpdateProductService,
}: Props) => {
  const theme = useTheme();
  const [user, setUser] = useState<user | null>(null);
  const [editableProduct, setEditableProduct] = useState<{
    id: number;
    name: string;
    model: string;
    price: number;
  } | null>(null);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const getProducts = useQuery({
    queryKey: ["GetAllProducts"],
    queryFn: () => GetAllProductsService(),
  });

  const createProduct = useMutation({
    mutationKey: ["CreateNewProduct"],
    mutationFn: CreateNewProductService,
    onSettled: (data) => {
      console.log(data);
      if (data) {
        alert(`${data.message} ${data.status}`);
      }
    },
  });

  const deleteProduct = useMutation({
    mutationKey: ["DeleteProduct"],
    mutationFn: DeleteProductService,
    onSettled: (data) => {
      if (data) {
        alert(data.message);
        window.location.reload();
      }
    },
  });

  const updateProduct = useMutation({
    mutationKey: ["UpdateProduct"],
    mutationFn: UpdateProductService,
    onSettled: (data) => {
      if (data) {
        alert(data.message);
        window.location.reload();
      }
    },
  });

  const methods = useForm<FormInputs>({
    defaultValues: {
      name: "",
      model: "",
      price: 0,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userObject = JSON.parse(user);
        setUser(userObject);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const onCloseSesion = () => {
    window.location.replace("http://localhost:5173/login");
    alert("Sesión cerrada!");
    localStorage.removeItem("user");
  };

  const onSubmit = methods.handleSubmit(async ({ name, model, price }) => {
    try {
      await createProduct.mutateAsync({
        request: {
          name,
          model,
          price,
        },
      });
      methods.reset();
    } catch (e) {
      console.log(e);
    }
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct.mutateAsync({ id });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async () => {
    if (editableProduct) {
      try {
        await updateProduct.mutateAsync({
          id: editableProduct.id,
          request: {
            name: editableProduct.name,
            model: editableProduct.model,
            price: editableProduct.price,
          },
        });
        setEditableProduct(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleEdit = (product: {
    id: number;
    name: string;
    model: string;
    price: number;
  }) => {
    setEditableProduct(product);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableProduct) {
      setEditableProduct({
        ...editableProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSortByPrice = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedProducts = getProducts.data?.slice().sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  return (
    <>
      <AppBar position="fixed" sx={appbar}>
        <Toolbar sx={toolbar}>
          <Box>
            <Typography variant="body1" color="initial">
              Bienvenido {`${user?.name} ${user?.paternalSurname}`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="initial">
              PRIVILEGIO:
              {user?.rol === 0 ? (
                <Box component="span" sx={rol}>{` CLIENTE`}</Box>
              ) : null}
              {user?.rol === 1 ? (
                <Box component="span" sx={rol}>{` FACTURA`}</Box>
              ) : null}
              {user?.rol === 2 ? (
                <Box component="span" sx={rol}>{` ADMINISTRADOR`}</Box>
              ) : null}
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={onCloseSesion}>
              Cerrar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {user?.rol === 2 ? <Box sx={create_container}>
        <FormProvider {...methods}>
          <Box sx={form_container}>
            <Box sx={title_container}>
              <Typography sx={title}>REGISTRAR PRODUCTO</Typography>
            </Box>
            <Box sx={form_fields}>
              <Box sx={field_container}>
                <Box sx={captions}>Nombre del producto:</Box>
                <Box sx={field}>
                  <InputTextForm
                    type="text"
                    name="name"
                    width="100%"
                    height="auto"
                    startIcon={null}
                    endIcon={null}
                    color={theme.palette.mainText.main}
                    backgroundColor={theme.palette.textFieldBg.main}
                    margin="0"
                    padding="0"
                    placeholder="Ingrese un nombre"
                    multiline={false}
                    borderRadius={1}
                  />
                </Box>
              </Box>
              <Box sx={field_container}>
                <Box sx={captions}>Modelo del producto:</Box>
                <Box sx={field}>
                  <InputTextForm
                    name="model"
                    type="text"
                    width="100%"
                    height="auto"
                    startIcon={null}
                    endIcon={null}
                    color={theme.palette.mainText.main}
                    backgroundColor={theme.palette.textFieldBg.main}
                    margin="0"
                    padding="0"
                    placeholder="Ingrese un modelo"
                    multiline={false}
                    borderRadius={1}
                  />
                </Box>
              </Box>
              <Box sx={field_container}>
                <Box sx={captions}>Precio del producto:</Box>
                <Box sx={field}>
                  <InputTextForm
                    name="price"
                    type="number"
                    width="100%"
                    height="auto"
                    startIcon={null}
                    endIcon={null}
                    color={theme.palette.mainText.main}
                    backgroundColor={theme.palette.textFieldBg.main}
                    margin="0"
                    padding="0"
                    placeholder="Ingrese el precio del producto"
                    multiline={false}
                    borderRadius={1}
                  />
                </Box>
              </Box>
            </Box>
            {createProduct.isError && (
              <Box sx={state_container}>
                <Typography sx={error}>
                  {createProduct.error?.message}
                </Typography>
              </Box>
            )}
            {createProduct.isSuccess && (
              <Box sx={state_container}>
                <Typography sx={success}>
                  {createProduct.data.message}
                </Typography>
              </Box>
            )}
            <Box sx={button_container}>
              <Button type="submit" sx={register_btn} onClick={onSubmit}>
                Registrar producto
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Box> : null}
      
      <Box sx={read_container}>
        <Box sx={header_read}>
          <Typography sx={header}>TABLA DE SOLO LECTURA</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre del Producto</TableCell>
                <TableCell>Modelo del Producto</TableCell>
                <TableCell>
                  <Button 
                      variant="contained"
                      color="primary"
                  onClick={handleSortByPrice}>
                    Precio {sortOrder === "asc" ? "↑" : "↓"}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProducts?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.model}</TableCell>
                  <TableCell>{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {user?.rol === 1  || user?.rol === 2  ?  <Box sx={delete_update_container}>
        <Box sx={header_read}>
          <Typography sx={header}>TABLA EDITABLE</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre del Producto</TableCell>
                <TableCell>Modelo del Producto</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getProducts.data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    {editableProduct?.id === product.id ? (
                      <TextField
                        name="name"
                        value={editableProduct.name}
                        onChange={handleChange}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editableProduct?.id === product.id ? (
                      <TextField
                        name="model"
                        value={editableProduct.model}
                        onChange={handleChange}
                      />
                    ) : (
                      product.model
                    )}
                  </TableCell>
                  <TableCell>
                    {editableProduct?.id === product.id ? (
                      <TextField
                        name="price"
                        value={editableProduct.price}
                        onChange={handleChange}
                      />
                    ) : (
                      product.price
                    )}
                  </TableCell>
                  <TableCell>
                    {editableProduct?.id === product.id ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUpdate}
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setEditableProduct(null)}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(product)}
                        >
                          Actualizar
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(product.id)}
                        >
                          Eliminar
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> : null}
     
    </>
  );
};

export default Crud;
