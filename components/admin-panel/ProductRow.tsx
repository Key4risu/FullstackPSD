import { IProduct } from "@/app/admin/dashboard/page";
import { setProduct } from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin4Line, RiDeleteBin5Line } from "react-icons/ri";
import Image from "next/image";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { makeToast } from "@/utils/helper";
import { log } from "console";

interface PropsType {
    srNo: number;
    setOpenPopup: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
    product: IProduct;
}

const ProductRow = ({ srNo, setOpenPopup, setUpdateTable, product }: PropsType) => {
    const dispatch = useAppDispatch();

    const onEdit = () => {
        dispatch(setProduct(product));
        setOpenPopup(true);
    };

    const onDelete = () => {
        dispatch(setLoading(true))

        const payLoad = {
            fileKey: product.filekey
        }

        axios.delete("/api/uploadthing",{data: payLoad}).then(res => {
            console.log(res.data);

            axios.delete(`/api/delete_product/${product._id}`).then(res => {
                console.log(res.data);
                makeToast("Product deleted successfully");
                setUpdateTable((prevState) => !prevState)
                
            }).catch((err) => console.log(err)
            ).finally(() => dispatch(setLoading(false)))
        }).catch((err) => console.log(err))

    };

    return (
        <tr>
            <td>
                <div>{srNo}</div>
            </td>
            <td>
                <div>{product.name}</div>
            </td>
            <td>
                <div>$ {product.price}</div>
            </td>
            <td className="py-2">
                <Image src={product.imgSrc} width={40} height={40} alt="product-img" />
            </td>
            <td>
                <div className="text-2xl flex items-center gap-2 text-gray-600">
                    <CiEdit
                        className="cursor-pointer hover:text-black"
                        onClick={onEdit}
                    />
                    <RiDeleteBin5Line
                        className="text-[20px] cursor-pointer hover:text-red-600"
                        onClick={onDelete}
                    />
                </div>
            </td>
        </tr>
    );
};

export default ProductRow;
