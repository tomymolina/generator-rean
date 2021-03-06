'use strict';

// <%= humanizedPluralName %> controller
angular.module('<%= slugifiedPluralName %>').controller('<%= classifiedPluralName %>Controller', ['$scope', '$stateParams', '$location', 'Authentication', '<%= classifiedPluralName %>',
	function($scope, $stateParams, $location, Authentication, <%= classifiedPluralName %>) {
		<% if (attributes.creatorId && attributes.creatorId.model === 'user'){ %>
		$scope.authentication = Authentication; <% } %>

		$scope.build = function(){
			$scope.<%= camelizedSingularName %> = new <%= classifiedPluralName %> ({ <% for(var attrName in publicAttributes) { var attr =  publicAttributes[attrName]; if(!isNonEditableAttribute(attr)) { %>
				<%= attrName %> : <%= attr.type === 'boolean' ? attr.default ? attr.default : true : 'null' %>, <% }} %>
			});
		};

		// Create new <%= humanizedSingularName %>
		$scope.create = function() {
            var self = this;
			// Create new <%= humanizedSingularName %> object
			var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %>;

			// Redirect after save
			<%= camelizedSingularName %>.$save(function(response) {
				$location.path('<%= slugifiedPluralName %>/' + response.id);

                // Clear form fields<% for(var attrName in publicAttributes) { if (!isNonEditableAttribute(publicAttributes[attrName])) {%>
                <%= camelizedSingularName %>.<%= attrName %> = null;<% }} %>
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing <%= humanizedSingularName %>
		$scope.remove = function(<%= camelizedSingularName %>) {
			if ( <%= camelizedSingularName %> ) {
				<%= camelizedSingularName %>.$remove();

				for (var i in $scope.<%= camelizedPluralName %>) {
					if ($scope.<%= camelizedPluralName %> [i] === <%= camelizedSingularName %>) {
						$scope.<%= camelizedPluralName %>.splice(i, 1);
					}
				}
			} else {
				$scope.<%= camelizedSingularName %>.$remove(function() {
					$location.path('<%= slugifiedPluralName %>');
				});
			}
		};

		// Update existing <%= humanizedSingularName %>
		$scope.update = function() {
			var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %>;

			<%= camelizedSingularName %>.$update(function() {
				$location.path('<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>.id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of <%= humanizedPluralName %>
		$scope.find = function() {
			$scope.<%= camelizedPluralName %> = <%= classifiedPluralName %>.query();
		};

		// Find existing <%= humanizedSingularName %>
		$scope.findOne = function() {
			$scope.<%= camelizedSingularName %> = <%= classifiedPluralName %>.get({
				<%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
			});
		};
	}
]);
