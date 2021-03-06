app.values.socialSupport = {}
app.values.socialSupportLast = _.last(p.find("social_support")) || {};

app.actions.socialSupport = function (id, ev) {
	var social = app.values.socialSupportLast;
	switch(id) {

		case 1460:

			app.styleChecks();

			$('.btn').attr('disabled', 'disabled');

			$('input').on('click', function (ev){
				//enables button if form is valid, else refreshes event listener
				validateSocialSupportForm();

			});

			$('.btn').on("click", function(ev){
			
				var people_array = []

				_.each($('[name="peoplePrac"]:checked'), function(people){

					people_array.push($(people).val());

				});
				social.practicalSupport = {
					supportPrac: $('[name="supportPrac"]:checked').val(),
					peoplePrac: people_array,
					otherSupport: $('#otherSupport').val(),
					satisfiedPrac: $('#satisfiedPrac-0').is(':checked'),
					numPrac: $('[name="numPrac"]:checked').val(),
				}

				practicalFeedbackModal(social.practicalSupport);
			});
			break;
		
		case 1461:

			$('.btn').attr('disabled', 'disabled');

			$('input').on('click', function (ev){
				//enables button if form is valid, else refreshes event listener
				validateSocialSupportForm();

			});

			$('.btn').on("click", function(ev){
			
				var people_array = []

				_.each($('[name="peopleEmot"]:checked'), function(people){

					people_array.push($(people).val());

				});
				
				social.emotionalSupport = {
					supportEmot: $('[name="supportEmot"]:checked').val(),
					peopleEmot: people_array,
					otherSupport: $('#otherSupport').val(),
					satisfiedEmot: $('#satisfiedEmot-0').is(':checked'),
					numEmot: $('[name="numEmot"]:checked').val()
				}

				emotionalFeedbackModal(social.emotionalSupport);
			});
			break;
		
		case 1462:

			$('.btn').attr('disabled', 'disabled');

			$('input').on('click', function (ev){
				//enables button if form is valid, else refreshes event listener
				validateSocialSupportForm();

			});

			$('.btn').on("click", function(ev){
			
				var people_array = []

				_.each($('[name="peopleBelong"]:checked'), function(people){

					people_array.push($(people).val());

				});
				
				social.belongingSupport = {
					supportBelong: $('[name="supportBelong"]:checked').val(),
					peopleBelong: people_array,
					otherSupport: $('#otherSupport').val(),
					satisfiedBelong: $('#satisfiedBelong-0').is(':checked'),
					numBelong: $('[name="numBelong"]:checked').val()
				}

				belongingFeedbackModal(social.belongingSupport);
				
			});
			break;

		case 1463:

			$('.btn').on("click", function(ev){
		
				social.improveSupport = $('[name="improveSupport"]:checked').val();
				social.id = null;
				p.save("social_support", social);
				app.values.socialSupport = {};
				app.values.socialSupportLast = _.last(p.find("social_support"));
				window.location.href='index.html';

			});
			break;
	}
}

function practicalFeedbackModal(pracObject) {
	
	console.log(pracObject);

	var html = "";
	switch(true) {

		case (pracObject.satisfiedPrac == true && (pracObject.supportPrac !== "Very much" && pracObject.supportPrac !== "A lot") && pracObject.numPrac != "Variety"):
			
			html+= "<p>You're satisfied with the practical support available to you, but it looks like you have few people you can turn to when you need that support and that you aren't super confident that you can get it when you need it.</p><p>Consider who you might be able to build a relationship with that might offer practical support, and how you might spend more time with supportive people to strengthen those relationships. Being able to receive practical support when you need it is important!</p>";
			
			break;

		case (pracObject.satisfiedPrac == false && (pracObject.supportPrac !== "Very much" && pracObject.supportPrac !== "A lot") && pracObject.numPrac !="Variety"):
			
			html+= "<p>It looks like you have few people you can turn to when you need practical support and that you aren't super confident that you can get this support when you need it. You also say you aren't satisfied with this situation!</p><p>Consider who you might be able to build a relationship with that might offer practical support, and how you might spend more time with supportive people to strengthen those relationships. Being able to receive practical support when you need it is important!</p>";
			
			break;

		case (pracObject.satisfiedPrac == true && (pracObject.supportPrac !== "Very much" && pracObject.supportPrac !== "A lot") && pracObject.numPrac == "Variety"):
			
			html+= "<p>It looks like you have several people you can turn to when you need practical support and that you are satisfied with the support available to you, but you aren't super confident that you can get that support when you need it.</p><p>Consider how you might spend more time with supportive people to strengthen those relationships so you can be more confident they will be there when you need them. Being able to receive practical support when you need it is important!</p>";

			break;

		case (pracObject.satisfiedPrac == false && (pracObject.supportPrac !== "Very much" && pracObject.supportPrac !== "A lot") && pracObject.numPrac == "Variety"):
			
			html+= "<p>It looks like you have several people you can turn to when you need practical support but that  you aren't super confident that you can get that support when you need it and you aren't satisfied with this.</p><p>Consider how you might spend more time with supportive people to strengthen those relationships so you can be more confident they will be there when you need them. Being more confident in your support network may help you feel more satisfied. Being able to receive practical support when you need it is important!</p>";
	
			break;

		case (pracObject.satisfiedPrac == true && (pracObject.supportPrac == "Very much" || pracObject.supportPrac == "A lot") && pracObject.numPrac != "Variety"):
			
			html+= "<p>It looks like you are very confident you can get practical support when you need it and that you are satisfied with the support available to you, but that you don't have a large variety of people you can turn to for this kind of support.</p><p>Consider who you might be able to build a relationship with that might offer another source of practical support. Being able to receive practical support when you need it is important!</p>";

			break;

		case (pracObject.satisfiedPrac == false && (pracObject.supportPrac == "Very much" || pracObject.supportPrac == "A lot") && pracObject.numPrac != "Variety"):
			
			html+= "<p>It looks like you are very confident you can get practical support when you need it but that you aren't satisfied with the support available to you and you don't have a large variety of people you can turn to for this kind of support.</p><p>Consider who you might be able to build a relationship with that might offer another source of practical support. Having a larger support network may help you feel more satisfied. Being able to receive practical support when you need it is important!</p>";

			break;

		case (pracObject.satisfiedPrac == true && (pracObject.supportPrac == "Very much" || pracObject.supportPrac == "A lot") && pracObject.numPrac == "Variety"):
			
			html+= "<p>It looks like you are very confident you can get practical support when you need it, you're satisfied with the support available to you, and you have a variety of people you can turn to for this kind of support.</p><p>That's great! Remembering that this support is there for you when you need it is important!</p>";

			break;

		case (pracObject.satisfiedPrac == false && (pracObject.supportPrac == "Very much" || pracObject.supportPrac == "A lot") && pracObject.numPrac == "Variety"):
			
			html+= "<p>It looks like you are very confident you can get practical support when you need it, you have a variety of people you can turn to for this kind of support, but you aren't satisfied with the support available to you.</p><p>Think about why you aren't satisfied and how you could build new relationships or strengthen existing ones to make your support network feel more satisfying to you. Being able to receive practical support when you need it is important!</p>";

			break;

	}
	if(html != ''){
		
		html += "<a class='simplemodal-close'>Move on to look at Emotional Support</a>";
		
		$.modal(html);

	}
}

function emotionalFeedbackModal(emotObject) {
	
	console.log(emotObject);

	var html = "";

	switch(true) {

		case (emotObject.satisfiedEmot == true && (emotObject.supportEmot !== "Very much" && emotObject.supportEmot !== "A lot") && emotObject.numEmot != "Variety"):
			
			html+= "<p>It doesn't look like you have too many people you can turn to when you need emotional support and you aren't that confident you can get it when you need it.</p>";

			html+= "<p>So, even though you're satisfied with what you have, you might want to think about ways you could develop more relationships that could offer you emotional support or how you could spend more time with supportive people to strengthen those ties.  You deserve to have people you can turn to for emotional support when you need it!</p>";

			break;

		case (emotObject.satisfiedEmot == false && (emotObject.supportEmot !== "Very much" && emotObject.supportEmot !== "A lot") && emotObject.numEmot !="Variety"):
			
			html+= "<p>It doesn't look like you have too many people you can turn to when you need emotional support and you aren't that confident you can get it when you need it.</p>";

			html+= "<p>Especially since you feel unsatisfied with this level of support, you might want to think about ways you could develop more relationships that could offer you emotional support or how you could spend more time with supportive people to strengthen those ties.  You deserve to have people you can turn to for emotional support when you need it!</p>";

			break;

		case (emotObject.satisfiedEmot == true && (emotObject.supportEmot !== "Very much" && emotObject.supportEmot !== "A lot") && emotObject.numEmot == "Variety"):
			
			html+= "<p>The good news is you have several people you can turn to when you need emotional support and you're satisfied with the level of emotional support available to you.</p>";

			html+= "<p>However, it doesn't seem like you're confident that you can always get this support when you need it. Think about who you might spend more time with to strengthen relationships that provide you with emotional support. This will help you build confidence that emotional support will be available to you when you need it!</p>";

			break;

		case (emotObject.satisfiedEmot == false && (emotObject.supportEmot !== "Very much" && emotObject.supportEmot !== "A lot") && emotObject.numEmot == "Variety"):
			
			html+= "<p>The good news is you have several people you can turn to when you need emotional support. But it doesn't seem like you're confident that you can get this support when you need it, and you are not satisfied with this situation.</p>";

			html+= "<p>Think about who you might spend more time with to strengthen relationships that provide you with emotional support. This will help you build confidence that emotional support will be available to you when you need it! That boost in confidence may help you feel more satisfied with your sources of emotional support.</p>";

			break;

		case (emotObject.satisfiedEmot == true && (emotObject.supportEmot == "Very much" || emotObject.supportEmot == "A lot") && emotObject.numEmot != "Variety"):
			
			html+= "<p>You are confident you can get the emotional support you need when you need it and you feel satisfied with that situation. However, you don't report having very many people you can turn to when you need this kind of support.</p>";

			html+= "<p>Think about people you can build relationships with who are likely to be good sources of emotional support for you in the future. Even though you are satisfied with your emotional support at this time, emotional support is so important that it's worth the effort to build up a variety of people you can turn to when you need it.</p>";

			break;

		case (emotObject.satisfiedEmot == false && (emotObject.supportEmot == "Very much" || emotObject.supportEmot == "A lot") && emotObject.numEmot != "Variety"):
			
			html+= "<p>You are confident you can get the emotional support you need when you need it. However, you don't report having very many people you can turn to when you need this kind of support and you find that unsatisfactory.</p>";

			html+= "<p>It may be hard since you do feel confident you can get this support when you need it, but think about people you can build relationships with who are likely to be good sources of emotional support for you in the future. Finding more sources of emotional support should help you feel more satisfied.</p>";

			break;

		case (emotObject.satisfiedEmot == true && (emotObject.supportEmot == "Very much" || emotObject.supportEmot == "A lot") && emotObject.numEmot == "Variety"):
			
			html+= "<p>You have a variety of people you can turn to for emotional support, you're satisfied with this support, and you feel confident you can get it when you need it.</p>";

			html+= "<p>You're doing well in this area!  Remember that this support is there when you need it.</p>";

			break;

		case (emotObject.satisfiedEmot == false && (emotObject.supportEmot == "Very much" || emotObject.supportEmot == "A lot") && emotObject.numEmot == "Variety"):
			
			html+= "<p>You have a variety of people you can turn to for emotional support, and you feel confident you can get it when you need it.</p>";

			html+= "<p>Think about why you're still unsatisfied with this support and see what you can do make it feel more satisfying to you. Maybe you'd like to spend more time with the people who give you emotional support, and strengthen those ties.  Or, maybe you'd like to build some new relationships--different people will give you emotional support in different ways, and you might be craving a new type of emotional connection.</p>";
			
			break;

	}

	if(html != ''){

		html += "<a class='simplemodal-close'>Move on to look at Belonging Support</a>";

		$.modal(html);
	}
}
function belongingFeedbackModal(belongObject) {
	
	console.log(belongObject);

	var html = "";

	switch(true) {

		case (belongObject.satisfiedBelong == true && (belongObject.supportBelong !== "Very much" && belongObject.supportBelong !== "A lot") && belongObject.numBelong != "Variety"):
			
			html+= "<p>It's always important to feel like you can fit in and belong somewhere. You're satisfied with your belonging support, but you don't have many sources you can turn to for this kind of support and you don't seem completely confident you can get it when you need it.</p>";

			html+= "<p>Are there people in your life who accept you just the way you are?  If so, you could develop or deepen those relationships by spending some more time with those people.  You could also volunteer or join organizations or clubs where you have a better chance of meeting like-minded people, so that you have more people who can provide you with belonging support.</p>";

			break;

		case (belongObject.satisfiedBelong == false && (belongObject.supportBelong !== "Very much" && belongObject.supportBelong !== "A lot") && belongObject.numBelong !="Variety"):
			
			html+= "<p>It's always important to feel like you can fit in and belong somewhere, but you don't feel satisfied with the belonging support available to you.  It doesn't seem like you have many sources you can turn to for this kind of support and you don't seem completely confident you can get it when you need it.</p>";

			html+= "<p>Are there people in your life who accept you just the way you are?  If so, you could develop or deepen those relationships by spending some more time with those people.  You could also volunteer or join organizations or clubs where you have a better chance of meeting like-minded people!</p>";

			break;

		case (belongObject.satisfiedBelong == true && (belongObject.supportBelong !== "Very much" && belongObject.supportBelong !== "A lot") && belongObject.numBelong == "Variety"):
			
			html+= "<p>It's great that you feel like you belong around a variety of people and are satisfied with the level of belonging support available to you. Still, it sounds like you aren't fully confident you can get this support when you need it.</p>";

			html+= "<p>Take a few moments to consider who you could spend more time with to strengthen relationships that really make you feel like you belong.  Doing so will increase your confidence that this support will be there when you need it most!</p>";

			break;

		case (belongObject.satisfiedBelong == false && (belongObject.supportBelong !== "Very much" && belongObject.supportBelong !== "A lot") && belongObject.numBelong == "Variety"):
			
			html+= "<p>It's great that you feel like you belong around a variety of people. Still, it sounds like you aren't fully confident you can get this support when you need it, and you're not completely satisfied with the level of support available to you.</p>";

			html+= "<p>Take a few moments to consider who you could spend more time with to strengthen relationships that really make you feel like you belong.  Doing so will increase your confidence that this support will be there when you need it most! Being confident that this support is available to you should also help you feel more satisfied.</p>";

			break;

		case (belongObject.satisfiedBelong == true && (belongObject.supportBelong == "Very much" || belongObject.supportBelong == "A lot") && belongObject.numBelong != "Variety"):
			
			html+= "<p>You're satisfied with the level of belonging support available to you and confident you can get it when you need it. That's great! However, you don't seem to have a variety of different people you can turn to for this support when you need it.</p>";

			html+= "<p>It's important to always feel like you belong somewhere, and having more people you can identify with will make this possible more of the time. Even though you feel confident about this support, think about other people who accept you just the way you are or share common interests with you, who you could build relationships with. These people are likely to be good sources of belonging support in the future.</p>";

			break;

		case (belongObject.satisfiedBelong == false && (belongObject.supportBelong == "Very much" || belongObject.supportBelong == "A lot") && belongObject.numBelong != "Variety"):
			
			html+= "<p>You're confident you can get belonging support when you need it. That's great! However, you don't seem to have a variety of different people you can turn to for this support when you need it, and you're not fully satisfied with the level of belonging support available to you.</p>";

			html+= "<p>It's important to always feel like you belong somewhere and having more people you can identify with will make this possible more of the time. Even though you feel confident about this support, think about other people who accept you just the way you are or share common interests with you, who you could build relationships with. These people are likely to be good sources of belonging support in the future.</p>";

			break;

		case (belongObject.satisfiedBelong == true && (belongObject.supportBelong == "Very much" || belongObject.supportBelong == "A lot") && belongObject.numBelong == "Variety"):
			
			html+= "<p>There are many people you feel like you belong around, and you're confident that you can get belonging support when you need it. Understandably, you are satisfied with this support.</p>";

			html+= "<p>You're doing great here!  Remember that this support is there for you when you need to feel like you belong!</p>";

			break;

		case (belongObject.satisfiedBelong == false && (belongObject.supportBelong == "Very much" || belongObject.supportBelong == "A lot") && belongObject.numBelong == "Variety"):
			
			html+= "<p>There are many people you feel like you belong around, and you're confident you can get belonging support when you need it. However, you don't feel completely satisfied with the level of support available to you.</p>";

			html+= "<p>See if you can figure out what you need to do to feel more satisfied with this support. Do you want to spend more time with the people that give you belonging support?  Or perhaps there are parts of your identity that you feel are important, but you have not felt comfortable sharing with your support network?  If so, you could try volunteering or joining organizations where you could meet new people who have more in common with you!</p>";

			break;

	}

	if(html != ''){

		html += "</div><a class='simplemodal-close'>One last step!</a>";

		$.modal(html);

	}

}

















