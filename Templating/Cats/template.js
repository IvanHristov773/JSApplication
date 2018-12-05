$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let temp = $('#cat-template').html();
        let theTemplate = Handlebars.compile(temp);
        let theCompiledHtml = theTemplate({cats});
        $('#allCats').append(theCompiledHtml);

        let btn = $('button');
        btn.on('click', showAndHide);

        function showAndHide() {
            if ($(this).text() === 'Show status code'){
                $(this).next().css('display', 'block');
                $(this).text('Hide status code');
            }
            else{
                $(this).next().css('display', 'none');
                $(this).text('Show status code');
            }
        }
    }

});
