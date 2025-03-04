import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { $axios } from "@/axios/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export function CartTable({ cartData }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const showToast = (msg: string, type: "success" | "error") => {
    toast({
      description: msg,
      variant: type === "success" ? "default" : "destructive",
      // variant: type, // Assuming your toast component supports a variant prop
    });
  };
  const { isPending: deleteSingleCart, mutate: deleteSingleCartMutate } =
    useMutation({
      mutationKey: ["delete-single-cart"],
      mutationFn: async (productId) => {
        return await $axios.delete(`/cart/delete/${productId}`);
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(["get-product-details"]);
        showToast(res?.data?.msg, "success");
      },
      onError: (error) => {
        showToast(
          error?.response?.data?.msg || "Something went wrong",
          "error"
        );
      },
    });
  const { isPending: deleteAllCart, mutate: deleteAllCartMutate } = useMutation(
    {
      mutationKey: ["delete-all-cart"],
      mutationFn: async () => {
        return await $axios.delete("/cart/clear");
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(["get-product-details"]);
        showToast(res?.data?.msg, "success");
      },
      onError: (error) => {
        showToast(
          error?.response?.data?.msg || "Something went wrong",
          "error"
        );
      },
    }
  );
  return (
    <div>
      <div className="flex w-full justify-between items-center mb-[20px]">
        <p className="text-2xl">CartPage</p>
        <Button onClick={() => deleteAllCartMutate()}>Delete All</Button>
      </div>
      <Table>
        <TableCaption>A list of your recent Cart.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="w-[200px] py-[20px]">Price</TableHead>
            <TableHead className="w-[200px]">Quantity</TableHead>
            <TableHead className="w-[200px] text-right">Sub-Total</TableHead>
            <TableHead className="w-[200px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartData.map((cart, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium py-[20px]">
                {cart.name}
              </TableCell>
              <TableCell>{cart.unitPrice}</TableCell>
              <TableCell>{cart.orderQuantity}</TableCell>
              <TableCell className="text-right">{cart.subTotal}</TableCell>
              <TableCell className="flex w-full justify-end h-max text-center m-auto cursor-pointer items-center align-middle pt-[20px]">
                <MdOutlineDeleteForever
                  className="text-[26px]"
                  onClick={() => deleteSingleCartMutate(cart.productId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
