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

from assessment.models import Evaluation
from assessment.serializers import EvaluationSerializer, EvaluationDetailSerializer, FileSerializer

class CreateEvaluationView(generics.CreateAPIView):
    """
        Get a specific Topic
        Return: 'id', 'title', 'content', 'slug', 'create_at', 'author', 'status'
    """
    serializer_class = EvaluationSerializer

class GetEvaluationsView(generics.ListAPIView):
    queryset = Evaluation.objects.filter(status='publish')
    serializer_class = EvaluationDetailSerializer

class GetEvaluationByIdView(generics.RetrieveAPIView):
    queryset = Evaluation.objects.filter(status='publish')
    serializer_class = EvaluationDetailSerializer

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
