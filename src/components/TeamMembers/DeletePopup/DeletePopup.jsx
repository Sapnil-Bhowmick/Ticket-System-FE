
import { useDispatch, useSelector } from "react-redux"
import styles from "./DeletePopup.module.css"
import axios from "axios"
import { api_constants } from "../../../utils/api_constants"
import { deleteMember } from "../../../Redux/slices/memberSlice"
import toast from "react-hot-toast"


const DeletePopup = ({setMemberId , activeMember , memberID}) => {

    console.log("activeMember" , activeMember)
    console.log("memberID" , memberID)

    const token = useSelector((Store) => Store.USER.token)
    const dispatch = useDispatch()

    const handleDelete = async() => {
        await deleteTeamMember()
        setMemberId(null)
    }

    const deleteTeamMember = async () => {
        console.log("inside delete member api")
        try {
          const res = await axios.delete(
            api_constants.BASE_URL + api_constants.DELETE_MEMBER + `?memberID=${activeMember._id}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            }
          )
    
        //   const { data: ticketData } = res.data
          dispatch(deleteMember({
            index: memberID
          }))

          console.log("RESPONSE" , res)

          toast.success(res.data.message)
    
        }
        catch (err) {
          const errMessage = err?.response?.data?.error?.message
          if (errMessage) {
            toast.error(errMessage)
          }
        }
      }

    return (
        <div
            className={styles.memberPopup}
            // style={customStyles && customStyles}
        >
            <p>This teammate will be deleted.</p>
            <div className={styles.btnDiv}>
                <button className={styles.cancel} onClick={() => setMemberId(null)}>Cancel</button>
                <button className={styles.confirm} onClick={handleDelete}>Confirm</button>
            </div>
        </div>
    )
}

export default DeletePopup
