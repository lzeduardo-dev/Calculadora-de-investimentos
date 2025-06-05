const isNonEmptyArray = (arrayElement) => {
	return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
	if (
		!isNonEmptyArray(columnsArray) ||
		!isNonEmptyArray(dataArray) ||
		!tableId
	) {
		throw new Error(
			"Para correta execução, precisamos de um array com as colunas, outro com as informações das linhas e tambem o id da tabela"
		);
	}
	const tableElement = document.getElementById(tableId);
	if (!tableElement || tableElement.nodeName !== "TABLE") {
		throw new Error("Id informado não corresponde a nenhum elemento table");
	}

	createTableHeader(tableElement, columnsArray);
	createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
	function createTheadElement(tableReference) {
		const thead = document.createElement("thead"); // <thead></thead>
		tableReference.appendChild(thead); // <table><thead></thead></table>
		return thead;
	}
	const tableHeaderReference =
		tableReference.querySelector("thead") ?? createTheadElement(tableReference);
	// <table><thead></thead></table>
	const headerRow = document.createElement("tr"); // <tr></tr>
	["bg-gray-500", "text-slate-200", "sticky", "top-0"].forEach((cssClass) =>
		headerRow.classList.add(cssClass)
	);
	for (const tableColumnObject of columnsArray) {
		const headerElement = /*html*/ `<th class = 'text-center'> ${tableColumnObject.columnLabel}</th>`;
		headerRow.innerHTML += headerElement;
	}

	tableHeaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItems, columnsArray) {
	function createTbodyElement(tableReference) {
		const tbody = document.createElement("tbody"); // <thead></thead>
		tableReference.appendChild(tbody); // <table><thead></thead></table>
		return tbody;
	}
	const tableBodyReference =
	tableReference.querySelector("thead") ?? createTbodyElement(tableReference);
	for (const [itemIndex, tableItem] of tableItems.entries()) {
		const tableRow = document.createElement("tr");
		if (itemIndex % 2 !== 0){
			tableRow.classList.add('bg-gray-100')
		}

		for (const tableColumn of columnsArray) {
			const formatFn = tableColumn.format ?? ((info) => info);
			tableRow.innerHTML += /*html*/ `<td class='text-center'>${formatFn(
				tableItem[tableColumn.accessor]
			)}</td>`;
		}
		tableBodyReference.appendChild(tableRow);
	}
}
