sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projetonetfix.controller.Inicio", {
            onInit: function () {
                var menu = {
                    primeiro : "BEGIN",
                    segundo : "MOVIES"
                };
                //CRIAR MODELO E PREENCHER COM DADOS
                var menuModel = new JSONModel();
                menuModel.setData(menu);

                //ATRIBUIR O MODELO NA TELA
                var tela = this.getView();
                tela.setModel(menuModel, "ModeloMenu")

                var resultados = {
                    titles : []
                };
                var filmesModel = new JSONModel();
                filmesModel.setData(resultados);
                tela.setModel(filmesModel, "APIFilmes");


            },
            onPressLinkInicio: function(){
                alert("Você clicou em inicio");
            },
            onPressLinkSeries: function () {
                alert ("Você apertou o link series");
            },
            onPressLinkFilmes: function(){
                alert ("Você clicou em filmes");
            },
            onApertarBuscar: function(){
                //obter o valor do campo de busca
                var filtro = this.byId("inputBuscar").getValue();
                //alert (filtro);

                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query='
                    + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'e639593942mshf261e3425c117bep11befdjsnb9a350a8b55d',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    //RESGATAR MODELO E ATAULIZAR OS DADOS
                    var view = this.getView();
                    var model = view.getModel("APIFilmes");
                    var dados = model.getData();

                    //LIMPAR A LISTA
                    dados.titles = [];
                    dados.titles = response.titles
                    model.refresh();
                }.bind(this));
            }
        });
    });
