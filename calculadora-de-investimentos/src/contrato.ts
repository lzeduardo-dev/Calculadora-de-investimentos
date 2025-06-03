// Contrato 
//1 - Sistema deve usar tailwindcss
//2 - Sistema deve ter um elemento html do tipo table (com id definido) preparado e sem informações dentro 
//3 - São necessários dois arrays para geração da tabela...
    //3.1 - Um array de dados 
    //3.2 - Um array com objetos que caracterizam as colunas
    //3.3 - não é necessário, mas pode se passar uma função de formatação dos dados daquela coluna


type columnObject = {
    columnLabel: string;
    accessor: string;
    formatFnN?: (info: number | string) => string;
};

type columnsArray = columnObject[];



