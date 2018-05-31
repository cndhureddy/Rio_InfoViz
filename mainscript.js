
var dic={};

var countryArr = ["............USA",
"  ...........CHINA",
"  ...........UK"
," .............RUSSIA"
,"  .............GERMANY"
,"...............FRANCE"
,"............JAPAN"
,"..............AUS"
,".............ITALY",
".................CANADA....."];

function start(){
  $(document).ready(function(){

  	$(".sportSel").change(function(){
  		if($(this).val() != "select"){
  			$(".genderSelGrp").show();
  		}else{
  			$(".genderSelGrp").hide();
  			$(".eventSelGrp").hide();
  			$(".resultsbutt").hide();
  		}
		
  	});

  	$(".genderSel").change(function(){
  		if($(this).val()!="select"){
  			$(".eventSelGrp").show();
	  		var reqObj = dic[$(".sportSel").val()][$(this).val()];
	  		var optionStr =	getOptionsStr(Object.keys(reqObj));
	  		$(".eventSel").html(optionStr);
  		}else{		
  			$(".eventSelGrp").hide();
  			$(".resultsbutt").hide();
  		}

  	});

  	$(".eventSelGrp").change(function(){
  		if($(this).val()!="select"){
  			$(".resultsbutt").show();
  		}else{		
  			$(".resultsbutt").hide();
  		}
  		
  	});

  	$(".resultsbutt").click(function(){
  		var reqObj = dic[$(".sportSel").val()][$(".genderSel").val()][$(".eventSel").val()];
  		console.log(reqObj);

  		var trOptions="";
  		Object.keys(reqObj).forEach(function(ele){
			trOptions +="<tr><td>"+ele +"</td><td>"+reqObj[ele] +"</td></tr>";
		});
  		$(".resultstable tbody").html(trOptions);


  		$(".resultsTableContainer").show();
  	});

  });

 }

function onClickChloropleth207(){
	$(".hideablediv").hide();
	$(".chloropleth207").show();

	setTimeout(function(){ $(".worldmapSelectbox").val("participants").trigger("change"); }, 50);

}

function onClickOlympicsResults(){
	$(".hideablediv").hide();
	$(".olympicsResults").show();
	dic={};
	d3.json("filteredwinners.json", function(error, data) {
		console.log(data);
		data.forEach(function(d){
			if(d["Sport"] in dic)
			{
				if(d["Event"] in dic[d["Sport"]][d["Gender"]])
				{
					dic[d["Sport"]][d["Gender"]][d["Event"]][d["Medal"]] = d["Country"];
				}
				else
				{
					 // : d
					dic[d["Sport"]][d["Gender"]][d["Event"]] = { };	
					dic[d["Sport"]][d["Gender"]][d["Event"]][d["Medal"]] = d["Country"];
				}
			}
			else
			{
				dic[d["Sport"]]={"M":{},"F":{}};
				dic[d["Sport"]][d["Gender"]][d["Event"]] = {};
				dic[d["Sport"]][d["Gender"]][d["Event"]][d["Medal"]]=d["Country"];
				// {d["Event"]:{d["Medal"]:d}};
			}
		});
		console.log(dic);

		var optionStr =	getOptionsStr(Object.keys(dic));
		$(".sportSel").html(optionStr);
		$(".sportSelGrp").show();
	});

}






function getOptionsStr(optionArr){
	var optionsStr="<option>select</option>";
	optionArr.forEach(function(ele){
		optionsStr +="<option>"+ele +"</option>";
	});
	return optionsStr;
}





function onClickTop10Countries(){
	$(".hideablediv").hide();
	$(".top10Countries").show();


}




 start();