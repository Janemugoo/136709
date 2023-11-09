import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Employee, Job } from ".";


export class Manager extends Employee {
  public jobs?: Job[];
  public comment?: Comment[];
  public department?: string;

  constructor(
    store: Firestore,
    department?: string,
    employee?: EmployeeOptions
  ) {
    const { email, firstName, lastName, position, hiredDate } = employee ?? {}; //destructure the employee obj obtain values
    super(store, firstName, lastName, email, position, hiredDate);
    this.department = department;
  }

  async create(managerName: string, managerDepartment: string) {
    const managerID = await this.generateID();
    return await addDoc(collection(this.store, "manager"), {
      managerName,
      managerDepartment,
      managerID,
    });
  }
  async generateID() {
    const managersQuery = query(collection(this.store, "manager"), limit(3));
    const managers = await getDocs(managersQuery);
    console.log(managers);
    if (!managers.docs.length) return "MKN-001";
    const lastManager = managers.docs.at(0)?.data();
    console.log(lastManager?.managerID.split("-"));
    const [code, number] = lastManager?.managerID.split("-");
    const validNumber = parseInt(number) + 1;

    return`${code}-00${validNumber}`
  }
  getManagers() {
    const managersQuery = query(collection(this.store, "manager"));
    return managersQuery;
  }
  async updateManagerRow(managerID: string, updatedFields:{ managerName: string,  managerDepartment: string}) {
    const managerDocRef = doc(this.store, 'managers', managerID);
    await updateDoc(managerDocRef, updatedFields);
  }
  async deleteManagerRow(managerID: string) {
    const managerDocRef = doc(this.store, "managers", managerID);
    await deleteDoc(managerDocRef);
  }
  updateInformation() {}
  delete() {}
  retrive() {}
}
