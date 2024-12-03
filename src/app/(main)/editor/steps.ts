import { EditorFormProps } from "@/lib/types"
import GeneralInfoForm from "./forms/GeneralInfoForm"
import PersonalInfoForm from "./forms/PersonalInfoForm"


export const steps:{
    title:string
    component:React.ComponentType<EditorFormProps>
    key:string
}[] = [
    { title: "General info", component: GeneralInfoForm, key: "general-info" },
    { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
]