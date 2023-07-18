from django.shortcuts import render
from rest_framework import viewsets, generics, status
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from rest_framework.generics import GenericAPIView
from docx import Document
from django.shortcuts import get_object_or_404
# import genericapiview
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
from django.db.models import Q  
from assessment.models import Evaluation, Like
from assessment.serializers import EvaluationSerializer, EvaluationDetailSerializer, FileSerializer, LikeSerializer

from user.models import NewUser

class CreateEvaluationView(generics.CreateAPIView):

    serializer_class = EvaluationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        images = request.FILES.getlist('images')

        if serializer.is_valid():
            evaluation = serializer.create_evaluation_with_images(serializer.validated_data, images)
            # Autres actions à effectuer après la création de l'évaluation
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetEvaluationsView(generics.ListAPIView):
    queryset = Evaluation.objects.filter(status='publish').order_by('-create_at')
    serializer_class = EvaluationDetailSerializer

class GetEvaluationByIdView(generics.RetrieveAPIView):
    queryset = Evaluation.objects.filter(status='publish')
    serializer_class = EvaluationDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.visits += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

# Work
class PDFDownloadView(GenericAPIView):
    serializer_class = FileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        text = serializer.validated_data.get('text')
        filename = serializer.validated_data.get('filename')
        print(text)
        print(filename)

        # Créer un fichier PDF
        pdf_file = BytesIO()
        doc = SimpleDocTemplate(pdf_file, pagesize=letter)

        # Créer le contenu du PDF
        styles = getSampleStyleSheet()
        content = [Paragraph(text, styles["Normal"])]

        # Générer le fichier PDF
        doc.build(content)

        # Renvoyer le fichier PDF en tant que réponse avec le nom de fichier dynamique
        pdf_file.seek(0)
        response = HttpResponse(pdf_file, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
        return response

class WordDownloadView(GenericAPIView):
    serializer_class = FileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        text = serializer.validated_data.get('text')
        filename = serializer.validated_data.get('filename')
        print(text)
        print(filename)

        # Créer un fichier Word
        doc = Document()

        # Ajouter du contenu au fichier Word
        doc.add_paragraph(text)

        # Enregistrer le fichier Word dans un flux de données
        word_file = BytesIO()
        doc.save(word_file)
        word_file.seek(0)

        # Renvoyer le fichier Word en tant que réponse avec le nom de fichier dynamique
        response = HttpResponse(word_file, content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
        return response

# class LikeEvaluationView(GenericAPIView):
#     def post(self, request, evaluation_id):
#         user = request.user
#         evaluation = get_object_or_404(Evaluation, id=evaluation_id)
        
#         like, created = Like.objects.get_or_create(user=user, content_object=evaluation)
        
#         if created:
#             return Response(status=status.HTTP_201_CREATED)
#         else:
#             return Response(status=status.HTTP_200_OK)

#     def delete(self, request, evaluation_id):
#         user = request.user
#         evaluation = get_object_or_404(Evaluation, id=evaluation_id)
        
#         Like.objects.filter(user=user, content_object=evaluation).delete()
        
#         return Response(status=status.HTTP_204_NO_CONTENT)


# class LikeListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Like.objects.all()
#     serializer_class = LikeSerializer

# class LikeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Like.objects.all()
#     serializer_class = LikeSerializer

class LikeCreateAPIView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def create(self, request, *args, **kwargs):
        # Récupérer l'ID de l'évaluation que vous souhaitez liker
        evaluation_id = request.data.get('evaluation')
        user_id = request.data.get('user')

        # Vérifier si l'évaluation existe et est valide
        try:
            evaluation = Evaluation.objects.get(pk=evaluation_id)
        except Evaluation.DoesNotExist:
            return Response({'error': 'Invalid evaluation ID'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Vérifier si l'utilisateur existe et est valide
        try:    
            user = NewUser.objects.get(pk=user_id)
        except NewUser.DoesNotExist:
            return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)   

        # Vérifier si l'utilisateur a déjà liké cette évaluation
        like_exists = Like.objects.filter(user=user_id, evaluation=evaluation).exists()
        if like_exists:
            return Response({'error': 'You have already liked this evaluation'}, status=status.HTTP_400_BAD_REQUEST)

        # Ajouter le like pour cette évaluation
        serializer = self.get_serializer(data={'user': user_id, 'evaluation': evaluation_id})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LikeDestroyAPIView(DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def post(self, request, *args, **kwargs):
        # Récupérer l'ID du like que vous souhaitez supprimer
        like_id = kwargs.get('pk')
        user_id = request.data.get('user')

        # Vérifier si le like existe et appartient à l'utilisateur actuel
        try:
            like = Like.objects.get(pk=like_id, user=user_id)
        except Like.DoesNotExist:
            return Response({'error': 'Invalid like ID'}, status=status.HTTP_400_BAD_REQUEST)

        # Supprimer le like
        self.perform_destroy(like)

        return Response(status=status.HTTP_204_NO_CONTENT)

class EvaluationSearchView(generics.ListAPIView):
    queryset = Evaluation.objects.filter(status='publish').order_by('-create_at')
    serializer_class = EvaluationDetailSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search', None)

        if search_query:
            queryset = queryset.filter(
                Q(slug__icontains=search_query) |
                Q(title__icontains=search_query) |
                Q(level__name__icontains=search_query) |
                Q(domain__name__icontains=search_query) |
                Q(course__name__icontains=search_query) |
                Q(establishment__name__icontains=search_query) |
                Q(content__icontains=search_query)
            )

        return queryset
