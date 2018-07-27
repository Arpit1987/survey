/*export const MockTemplates = 
[{"id":"Template1","name":"Test Template 2","description":"Test Template","owners":"owner2, owener2,","sections":[{"id":"12345","description 	":"TestSection","mandatory":true,"sequenceId":"1","questions":null},{"sectionId":"12349","sectionDesc":"TestSection2","mandatory":true,"sequenceId":"2","questions":null}],"mandatoryTags":[{"key":"Applications","values":["CDW"," EDW"," CPLUS"],"keyId":null},{"key":"Towers","values":["OSS"," BSS"," CDEP"," Testing"],"keyId":null},{"key":"CRs","values":["5211"],"keyId":null},{"key":"Onshore DPEs","values":["Kipp Clements"," Debbie Seagraves"],"keyId":null},{"key":"Offshore DPEs","values":["Sudheer Mangalpady"," Padmavathi Ramachandra "],"keyId":null}]}]
*/

export const MockTemplates = 
[
	{
		"id":"Template1",
		"name":"Test Template 2",
		"description":"Test Template",
		"currentSection":"0",
		"status": "open",
		"sections":[
			{
				"id":"ID1",
				"name":"TestName1",
				"description":"TestSection1",
				"mandatory":true,
				"sequenceId":"1",
				"questions":[
						{
							"id":"QID1",
							"question":"This is a test Question?",
							"type":"Yes/No",
							"mandatory":true,
							"sequenceId":"1"
						},
						{
							"id":"QID2",
							"question":"This is a test Question2?",
							"type":"MultipleChoice",
							"mandatory":true,
							"sequenceId":"2"
						}
					]
			},
			{
				"id":"ID2",
				"name":"TestName2",
				"description":"TestSection2",
				"mandatory":true,
				"sequenceId":"2",
								"questions":[
						{
							"id":"QID3",
							"question":"This is a test Question3?",
							"type":"Yes/No",
							"mandatory":true,
							"sequenceId":"1"
						},
						{
							"id":"QID4",
							"question":"This is a test Question4?",
							"type":"MultipleChoice",
							"mandatory":true,
							"sequenceId":"2"
						}
					]
			}
		]
		
	}
]

