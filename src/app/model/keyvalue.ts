export interface Values {
     value: string;
}

export class KeyValue{
	
	 constructor (
		public key?: string,
		public values?: Values[]
	 ){
	 }
}