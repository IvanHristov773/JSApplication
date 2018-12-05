function attachEvents() {
    $('#btnLoadTowns').on('click', getTownsInfo);


    function getTownsInfo() {
        $('#root').empty();
        let townsData = $('#towns').val().split(', ');
        let objData = {towns: []};
        for (let obj of townsData) {
            let info = {town: obj};
            objData.towns.push(info);
        }

        let theTemplateScript = $("#towns-template").html();
        let theTemplate = Handlebars.compile(theTemplateScript);
        let theCompiledHtml = theTemplate(objData);
        $('#root').append(theCompiledHtml);

    }
}
